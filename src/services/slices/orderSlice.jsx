import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/API";
import { request } from "../../utils/requests";

const initialState = {
  ingredients: [],
  order: {},
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setInredients: (state, action) => {
      const { ingredientsId } = action.payload;
      state.ingredients = ingredientsId;
    },
    getOrderDetails: (state, action) => {
      state.order = action.payload;
    },
    clearOrderDetails: (state) => {
      state.order = {};
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setError: (state, action) => {
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

export const createOrder = (data) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const responseData = await request(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: data,
      }),
    });

    dispatch(setSuccess(true));
    dispatch(setLoading(false));
    dispatch(getOrderDetails(responseData));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default orderSlice.reducer;
