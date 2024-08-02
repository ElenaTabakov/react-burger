import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as UUID } from "uuid";
import { IIngredientItem,IIngredientItemWithId } from "../../utils/types/types";

interface  InitialStateConstructor {
  bun: IIngredientItemWithId[] | null;
  ingredients: IIngredientItemWithId[] ;
}

const initialState:InitialStateConstructor = {
  bun: [],
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<IIngredientItemWithId>) => {
        const ingredient = action.payload; 
        if (ingredient.type === "bun") {
          state.bun = [ingredient];
        } else {
          state.ingredients = [...state.ingredients, ingredient];
        }
      },
      prepare:(ingredient) => {
        return {
          payload: { ...ingredient, uniqueId: UUID() },
        };
      },
    },

    deleteIngredient: (state, action: PayloadAction<string>) => {
      const uniqueId = action.payload;
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== uniqueId
      );
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = [];
    }
  },
});

export const { addIngredient, deleteIngredient,clearConstructor } = constructorSlice.actions;

export default constructorSlice.reducer;
