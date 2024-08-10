import reducer, { addIngredient, deleteIngredient, clearConstructor } from '../../services/slices/constructorSlice';

describe('constructorSlice', () => {
    const bunItem = { id: '1', name: 'Bun', type: 'bun', price: 2 };
    const ingredientItem = { id: '2', name: 'Cheese', type: 'ingredient', price: 1 };

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual({
            bun: [],
            ingredients: [],
        });
    });

    it('should handle addIngredient for bun', () => {
        const action = {
            type: addIngredient.type,
            payload: { ...bunItem, uniqueId: 'test-uuid' },
        };
        const expectedState = {
            bun: [{ ...bunItem, uniqueId: 'test-uuid' }],
            ingredients: [],
        };

        const actualState = reducer(undefined, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should handle addIngredient for ingredient', () => {
        const action = {
            type: addIngredient.type,
            payload: { ...ingredientItem, uniqueId: 'test-uuid' },
        };

        const expectedState = {
            bun: [],
            ingredients: [{ ...ingredientItem, uniqueId: 'test-uuid' }],
        };

        const actualState = reducer(undefined, action);
        expect(actualState).toEqual(expectedState);
    });
    it('should handle deleteIngredient', () => {
        const initialState = {
            bun: [],
            ingredients: [{id: '2', name: 'Cheese', type: 'ingredient', price: 1, uniqueId:'test-uuid-cheese'}],
        };

        const action = {
            type: deleteIngredient.type,
            payload: 'test-uuid-cheese', 
        };

        const expectedState = {
            bun: [],
            ingredients: [], 
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });

    it('should handle clearConstructor', () => {
        const initialState = {
            bun: [bunItem],
            ingredients: [ingredientItem],
        };

        const action = {
            type: clearConstructor.type,
        };

        const expectedState = {
            bun: [],
            ingredients: [], 
        };

        const actualState = reducer(initialState, action);
        expect(actualState).toEqual(expectedState);
    });
});
