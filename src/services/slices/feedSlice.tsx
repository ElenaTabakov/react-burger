import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/types/types";
interface IOrdersArray {
  orders: IOrder[];
  success: boolean;
  total: number | null;
  totalToday: number | null;
}
interface FeedState {
  ordersData: IOrdersArray;
  status: "connecting" | "connected" | "disconnected" | "error";
  error: string | null;
}

const initialState: FeedState = {
    ordersData: {
    orders: [],
    success: false,
    total: null,
    totalToday: null,
  },
  status: "disconnected",
  error: null,
};

const feedSlice = createSlice({
  name: "orders",
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
    wsMessage: (state, action: PayloadAction<IOrdersArray>) => {
      state.ordersData = action.payload;
      //   console.log("Received orders store:",action.payload)
    },
    wsConnect: (state, action: PayloadAction<string>) => {},
    wsDisconnect: (state) => {},
  },
});

export const {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  wsConnect,
  wsDisconnect,
} = feedSlice.actions;

export default feedSlice.reducer;
