import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import orderReducer, {
    setInredients,
    getOrderDetails,
    clearOrderDetails,
    setLoading,
    setSuccess,
    setError,
    createOrder,
} from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { fetchWithRefresh } from '../../utils/requests';
import { BASE_URL } from '../../utils/API';

jest.mock('../../utils/requests', () => ({
    fetchWithRefresh: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('orderSlice reducer and actions', () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(
                { result: "OK" }
            ),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
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

        fetchWithRefresh.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(order),
        }));

        const store = mockStore({}); 

        const expectedActions = [
            setLoading(true),
            setSuccess(true),
            setLoading(false),
            getOrderDetails(order),
            clearConstructor(),
        ];

        const token = 'test-token';
        localStorage.setItem('accessToken', token);

        await store.dispatch(createOrder(['123', '456']));

        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
    });

    test('should handle failed order creation', async () => {
        const store = mockStore({});
        const errorMessage = 'Failed to create order';

        fetchWithRefresh.mockRejectedValue(new Error(errorMessage));

        const expectedActions = [
            setLoading(true),
            setError(errorMessage),
            setLoading(false),
        ];

        const token = 'test-token';
        localStorage.setItem('accessToken', token);

        await store.dispatch(createOrder(['123', '456']));

        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
    });
});
