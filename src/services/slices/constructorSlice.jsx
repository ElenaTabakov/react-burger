import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bun:[],
    ingredients: []
}

export const constructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers:{
        addIngredient: (state,action) => {
            const {type, ingredient, uniqueId} = action.payload;
            if(type === 'bun') {
                state.bun = [ingredient];
            }else{
                const newIngredient = { ...ingredient, uniqueId: uniqueId };
                state.ingredients = [...state.ingredients, newIngredient]
            }
        },
        deleteIngredient: (state, action) => {           
            const { uniqueId } = action.payload;
            state.ingredients = state.ingredients.filter(item => item.uniqueId !== uniqueId)
        }
    }
})

export const { addIngredient,deleteIngredient } = constructorSlice.actions;

export default constructorSlice.reducer;
