import userReducer, {
    setUser,
    setLoading,
    setSuccess,
    setError,
  } from '../../services/slices/userSlice';
  
  describe('userSlice reducer', () => {
    const initialState = {
      isAuth: false,
      isLoading: false,
      isSuccess: false,
      isError: false,
      user: {
        name: '',
        email: '',
      },
    };
  
    it('should return the initial state', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle setUser', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      const nextState = userReducer(initialState, setUser({ user, isAuth: true }));
      expect(nextState.user).toEqual(user);
      expect(nextState.isAuth).toBe(true);
    });
  
    it('should handle setLoading', () => {
      const nextState = userReducer(initialState, setLoading(true));
      expect(nextState.isLoading).toBe(true);
    });
  
    it('should handle setSuccess', () => {
      const nextState = userReducer(initialState, setSuccess(true));
      expect(nextState.isSuccess).toBe(true);
    });
  
    it('should handle setError', () => {
      const nextState = userReducer(initialState, setError(true));
      expect(nextState.isError).toBe(true);
    });
  });
  