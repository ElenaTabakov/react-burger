import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    Middleware,
} from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../store";
import { refreshToken } from "../../utils/requests";

export interface WebSocketActions {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<any>;
    wsConnecting: ActionCreatorWithoutPayload;
    wsOpen: ActionCreatorWithoutPayload;
    wsClose: ActionCreatorWithoutPayload;
    wsError: ActionCreatorWithPayload<string>;
    wsMessage: ActionCreatorWithPayload<any>;
}

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
    wsActions: WebSocketActions,
    withTokenRefresh: boolean = false
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            sendMessage,
            wsOpen,
            wsClose,
            wsError,
            wsMessage,
            wsConnecting,
            disconnect,
        } = wsActions;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = "";

        return (next) => (action) => {
            const { dispatch } = store;

            if (connect.match(action)) {
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
                dispatch(wsConnecting());

                socket.onopen = () => {
                    dispatch(wsOpen());
                };

                socket.onerror = () => {
                    dispatch(wsError("Error"));
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    console.log("Received data:", data)
                    try {
                        const parsedData = JSON.parse(data);

                        if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                            refreshToken()
                                .then(refreshData => {
                                    const wssUrl = new URL(url);
                                    wssUrl.searchParams.set(
                                        "token",
                                        refreshData.accessToken.replace("Bearer ", "")
                                    );
                                    dispatch(connect(wssUrl.toString()));
                                })
                                .catch(err => {
                                    dispatch(wsError((err as { message: string }).message));
                                });
                            
                            dispatch(disconnect());
                            return;
                        }

                        dispatch(wsMessage(parsedData));
                    } catch (error) {
                        dispatch(wsError((error as { message: string }).message));
                    }
                };

                socket.onclose = () => {
                    dispatch(wsClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url));
                        }, RECONNECT_PERIOD);
                    }
                };
            }

            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (error) {
                    dispatch(wsError((error as { message: string }).message));
                }
            }

            if (socket && disconnect.match(action)) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }

            next(action);
        };
    };
};
