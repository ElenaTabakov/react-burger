import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/API";
import { request } from "../../utils/requests";

const initialState = {
  ingredients: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredients: (state, action) => {
      state.ingredients = action.payload;
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
  getIngredients,
  increaseQty,
  decreaseQty,
  setLoading,
  setError,
  setSuccess,
} = ingredientsSlice.actions;

export const fetchIngredientsAsync = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const ingredients = await request(`${BASE_URL}/ingredients`);
    dispatch(getIngredients(ingredients.data));
    dispatch(setSuccess(true));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default ingredientsSlice.reducer;
