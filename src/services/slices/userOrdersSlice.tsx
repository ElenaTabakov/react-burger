import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserOrder {
  token?: string;
 ingregients: string[];
 status: string;
}

interface UserOrdersState {
  userOrders: UserOrder[];
  status: "connecting" | "connected" | "disconnected" | "error";
  error: string | null;
}

const initialState: UserOrdersState = {
  userOrders: [],
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
    wsMessage: (state, action: PayloadAction<UserOrder[]>) => {
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
