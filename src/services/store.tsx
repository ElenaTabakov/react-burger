import { configureStore } from "@reduxjs/toolkit";
import constructorReducer from "./slices/constructorSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import orderReducer from "./slices/orderSlice";
import currentIngredientReducer from "./slices/currentIngredientSlice";
import userReducer from './slices/userSlice'

export interface IngredientItemProps{
  calories:number;
carbohydrates:number;
fat:number;
image:string;
image_large:string;
image_mobile:string;
name:string;
price:number;
proteins:number;
type:string;
__v:number;
_id:string;
}

export interface IngredientsProps {
  ingredients: IngredientItemProps[];
  isLoading: boolean;
  isSuccess: boolean;
  error: null| string;
}
export interface ConstructorBurgerProps {
  ingredients: string[];
}
export interface CurrentIngredientProps {

}
export interface OrderProps {

}
export interface UserProps {

}
export interface StoreReduserProps {
  ingredients: IngredientsProps;
  constructorBurger: ConstructorBurgerProps;
  currentIngredient: CurrentIngredientProps;
  order: OrderProps;
  user: UserProps;
}
export interface RootState {
    reducer : StoreReduserProps;
}

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorBurger: constructorReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    user: userReducer
  },
});
