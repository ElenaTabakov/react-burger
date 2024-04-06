import { createSlice } from '@reduxjs/toolkit';
import { v4 as UUID } from 'uuid';



const initialState = {
    bun:[],
    ingredients: []
}

export const constructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers:{
        addIngredient: (state,action) => {
            const {type, ingredient} = action.payload;
            if(type === 'bun') {
                state.bun = [ingredient];
            }else{
                const newIngredient = {...ingredient, id: UUID()}
                state.ingredients = [...state.ingredients, newIngredient]
            }
        },
        deleteIngredient: (state, action) => {           
            const {newId} = action.payload;
            state.ingredients = state.ingredients.filter(item => item.id !== newId)
        }
    }
})

export const { addIngredient,deleteIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
