import { configureStore } from "@reduxjs/toolkit";
import constructorReducer from "./slices/constructorSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import orderReducer from "./slices/orderSlice";
import currentIngredientReducer from "./slices/currentIngredientSlice";
import userReducer from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorBurger: constructorReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    user: userReducer,
  },
});
