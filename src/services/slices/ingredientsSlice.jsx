import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/API";

const initialState = {
  ingredients: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

// const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    increaseQty: (state, action) => {
      const { ingredient } = action.payload;
      state.ingredients = state.ingredients.map((item) => {
        if (item.type === "bun") {
          if (item._id === ingredient._id) {
            item.__v = 2;
          } else {
            item.__v = 0;
          }
        } else {
          if (item._id === ingredient._id) {
            item.__v = item.__v + 1;
          }
        }
        return item;
      });
    },
    decreaseQty: (state, action) => {
      const { originalId } = action.payload;
      state.ingredients = [
        ...state.ingredients,
        state.ingredients.map((item) =>
          item._id === originalId ? item.__v-- : item
        ),
      ];
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
    const res = await fetch((`${BASE_URL}/ingredients`));
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const ingredients = await res.json();
    dispatch(getIngredients(ingredients.data));
    dispatch(setSuccess(true));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default ingredientsSlice.reducer;
