import currentIngredientsReducer, { setCurrentIngredient, clearCurrentIngredient } from '../../services/slices/currentIngredientSlice';

describe('currentIngredientsSlice', () => {
    const initialState = {
        currentIngredient: {},
    };

    it('should handle initial state', () => {
        expect(currentIngredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setCurrentIngredient', () => {
        const ingredient = { id: '1', name: 'Lettuce', type: 'ingredient', price: 1 };
        const state = currentIngredientsReducer(initialState, setCurrentIngredient(ingredient));
        expect(state).toEqual({ currentIngredient: ingredient });
    });

    it('should handle clearCurrentIngredient', () => {
        const ingredient = { id: '1', name: 'Lettuce', type: 'ingredient', price: 1 };
        const preloadedState = { currentIngredient: ingredient };
        const state = currentIngredientsReducer(preloadedState, clearCurrentIngredient());
        expect(state).toEqual({ currentIngredient: {} });
    });
});
