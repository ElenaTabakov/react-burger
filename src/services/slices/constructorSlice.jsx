import { createSlice } from "@reduxjs/toolkit";
import { v4 as UUID } from "uuid";

const initialState = {
  bun: [],
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        const ingredient = action.payload; 
        if (ingredient.type === "bun") {
          state.bun = [ingredient];
        } else {
          state.ingredients = [...state.ingredients, ingredient];
        }
      },
      prepare: (ingredient) => {
        return {
          payload: { ...ingredient, uniqueId: UUID() },
        };
      },
    },

    deleteIngredient: (state, action) => {
      const { uniqueId } = action.payload;
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== uniqueId
      );
    },
  },
});

export const { addIngredient, deleteIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
