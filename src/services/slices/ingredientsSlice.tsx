import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/API";
import { request } from "../../utils/requests";
import { IIngredientItem } from "../../utils/types/types";
import { AppThunk } from "../store";

export interface IIngredientsState {
  ingredients: IIngredientItem[];
  ingredientsMap: { [key: string]: IIngredientItem };
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsMap: {},
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredients: (state, action: PayloadAction<IIngredientItem[]>) => {
      state.ingredients = action.payload;
      state.ingredientsMap = hashMapIngredients(action.payload);
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

export const { getIngredients, setLoading, setError, setSuccess } =
  ingredientsSlice.actions;

const hashMapIngredients = (
  arr: IIngredientItem[]
): { [key: string]: IIngredientItem } => {
  return arr.reduce(
    (map: { [key: string]: IIngredientItem }, item: IIngredientItem) => {
      map[item._id] = item;
      return map;
    },
    {}
  );
};

export const fetchIngredientsAsync =
  (): AppThunk => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const ingredients = await request(`${BASE_URL}/ingredients`);
      dispatch(getIngredients(ingredients.data));
      dispatch(setSuccess(true));
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

export default ingredientsSlice.reducer;
