import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/types/types";

interface IOrdersObject{
  orders: IOrder[];
  success: boolean;
  total: number | null;
  totalToday: number | null;
}
export interface UserOrdersState {
  userOrders:  IOrdersObject;
  status: "connecting" | "connected" | "disconnected" | "error";
  error: string | null;
}

const initialState: UserOrdersState = {
  userOrders: {
    orders: [],
    success: false,
    total: null,
    totalToday: null
  },
  status: "disconnected",
  error: null,
};

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = "connecting";
    },
    wsOpen: (state) => {
      state.status = "connected";
    },
    wsClose: (state) => {
      state.status = "disconnected";
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<IOrdersObject>) => {
      state.userOrders = action.payload;
    },
    wsConnect: (state, action: PayloadAction<string>) => {},
    wsDisconnect: (state) => {},
  },
});

export const {
    wsConnecting, wsOpen, wsClose, wsError, wsMessage, wsConnect, wsDisconnect 
} = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
