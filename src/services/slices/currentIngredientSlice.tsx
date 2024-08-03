import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentIngredient: {},
};

export const currentIngredientsSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {    
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
        state.currentIngredient = {}
    }
  },
});

export const { setCurrentIngredient,clearCurrentIngredient } = currentIngredientsSlice.actions;

export default currentIngredientsSlice.reducer;
