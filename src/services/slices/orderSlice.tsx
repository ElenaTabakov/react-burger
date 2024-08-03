import {  createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/API";
import { fetchWithRefresh } from "../../utils/requests";
import { clearConstructor } from "./constructorSlice";
import {IOrderContent } from "../../utils/types/types";
import { AppThunk } from "../store";

interface IOrderState {
  ingredients: string[];
  order: IOrderContent | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState : IOrderState = {
  ingredients: [],
  order: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};


export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setInredients: (
      state,
      action: PayloadAction<{ ingredientsId: string[] }>
    ) => {
      const { ingredientsId } = action.payload;
      state.ingredients = ingredientsId;
    },
    getOrderDetails: (state, action: PayloadAction<IOrderContent>) => {
      console.log(action.payload, 'payload')
      state.order = action.payload;
    },
    clearOrderDetails: (state) => {
      state.order = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setInredients,
  getOrderDetails,
  clearOrderDetails,
  setLoading,
  setSuccess,
  setError,
} = orderSlice.actions;

export const createOrder =
  (data: string[]) : AppThunk  => async (dispatch: Dispatch) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      dispatch(setError("No access token found"));
      return;
    }
    dispatch(setLoading(true));
    try {
      const responseData = await fetchWithRefresh(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           authorization: token,
        },
        body: JSON.stringify({
          ingredients: data,
        }),
      });
      dispatch(setSuccess(true));
      dispatch(setLoading(false));
      dispatch(getOrderDetails(responseData));
      dispatch(clearConstructor());
    } catch (error : unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };

export default orderSlice.reducer;
