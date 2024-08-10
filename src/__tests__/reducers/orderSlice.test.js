import { createOrder } from '../../services/slices/orderSlice';
import { fetchWithRefresh } from '../../utils/requests';
import { BASE_URL } from '../../utils/API';
import { clearConstructor } from '../../services/slices/constructorSlice';

jest.mock('../../utils/requests', () => ({
    fetchWithRefresh: jest.fn(),
}));

jest.mock('../../services/slices/constructorSlice', () => ({
    clearConstructor: jest.fn(),
}));

describe('orderSlice createOrder thunk', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should handle successful order creation', async () => {
        const order = {
            _id: '1',
            ingredients: ['123', '456'],
            owner: {},
            status: 'done',
            name: 'Test Order',
            createdAt: '2024-08-09',
            updatedAt: '2024-08-09',
            number: 1,
            price: 100,
        };

        fetchWithRefresh.mockResolvedValueOnce(order);

        const dispatch = jest.fn();
        const getState = jest.fn(); 

        const token = 'test-token';
        localStorage.setItem('accessToken', token);

        // Вызов thunk напрямую
        await createOrder(['123', '456'])(dispatch, getState, undefined);

        // Проверка вызовов dispatch
        expect(dispatch).toHaveBeenCalledWith({ type: 'order/setLoading', payload: true });
        expect(dispatch).toHaveBeenCalledWith({ type: 'order/setSuccess', payload: true });
        expect(dispatch).toHaveBeenCalledWith({ type: 'order/setLoading', payload: false });
        expect(dispatch).toHaveBeenCalledWith({ type: 'order/getOrderDetails', payload: order });
        expect(dispatch).toHaveBeenCalledWith(clearConstructor());

        expect(fetchWithRefresh).toHaveBeenCalledWith(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
            body: JSON.stringify({ ingredients: ['123', '456'] }),
        });
    });

    test('should handle failed order creation', async () => {
        const errorMessage = 'Failed to create order';
        fetchWithRefresh.mockRejectedValueOnce(new Error(errorMessage));

        const dispatch = jest.fn();

        const token = 'test-token';
        localStorage.setItem('accessToken', token);

        await createOrder(['123', '456'])(dispatch, jest.fn(), undefined);

        expect(dispatch).toHaveBeenCalledWith({ type: 'order/setLoading', payload: true });
        expect(dispatch).toHaveBeenCalledWith({ type: 'order/setError', payload: errorMessage });
        expect(dispatch).toHaveBeenCalledWith({ type: 'order/setLoading', payload: false });
    });
});
