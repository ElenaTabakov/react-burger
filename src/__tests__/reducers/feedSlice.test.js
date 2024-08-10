import feedReducer, {
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage,
  } from '../../services/slices/feedSlice';
  
  describe('feedSlice reducer', () => {
    const initialState = {
      ordersData: {
        orders: [],
        success: false,
        total: null,
        totalToday: null,
      },
      status: 'disconnected',
      error: null,
    };
  
    it('should return the initial state', () => {
      expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle wsConnecting', () => {
      const state = feedReducer(initialState, wsConnecting());
      expect(state.status).toEqual('connecting');
    });
  
    it('should handle wsOpen', () => {
      const state = feedReducer(initialState, wsOpen());
      expect(state.status).toEqual('connected');
    });
  
    it('should handle wsClose', () => {
      const state = feedReducer(initialState, wsClose());
      expect(state.status).toEqual('disconnected');
    });
  
    it('should handle wsError', () => {
      const error = 'WebSocket error';
      const state = feedReducer(initialState, wsError(error));
      expect(state.status).toEqual('error');
      expect(state.error).toEqual(error);
    });
  
    it('should handle wsMessage', () => {
      const ordersData = {
        orders: [{ id: '1', status: 'done', ingredients: ['ing1', 'ing2'], name: 'Burger', createdAt: '2024-08-09', updatedAt: '2024-08-09', number: 1234 }],
        success: true,
        total: 100,
        totalToday: 10,
      };
      const state = feedReducer(initialState, wsMessage(ordersData));
      expect(state.ordersData).toEqual(ordersData);
    });
  });
  