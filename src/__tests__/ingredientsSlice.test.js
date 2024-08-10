import ingredientsReducer, { 
    getIngredients, 
    setLoading, 
    setError, 
    setSuccess
  } from '../services/slices/ingredientsSlice';

  
  describe('ingredientsSlice', () => {
    const initialState = {
      ingredients: [],
      ingredientsMap: {},
      isLoading: false,
      isSuccess: false,
      error: null,
    };
  
    it('should handle initial state', () => {
      expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle getIngredients', () => {
      const mockIngredients = [
        { _id: '1', name: 'Ingredient 1' },
        { _id: '2', name: 'Ingredient 2' }
      ];
  
      const actual = ingredientsReducer(initialState, getIngredients(mockIngredients));
      expect(actual.ingredients).toEqual(mockIngredients);
      expect(actual.ingredientsMap).toEqual({
        '1': mockIngredients[0],
        '2': mockIngredients[1],
      });
    });
  
    it('should handle setLoading', () => {
      const actual = ingredientsReducer(initialState, setLoading(true));
      expect(actual.isLoading).toEqual(true);
    });
  
    it('should handle setSuccess', () => {
      const actual = ingredientsReducer(initialState, setSuccess(true));
      expect(actual.isSuccess).toEqual(true);
    });
  
    it('should handle setError', () => {
      const actual = ingredientsReducer(initialState, setError('Error occurred'));
      expect(actual.error).toEqual('Error occurred');
    });
  });
