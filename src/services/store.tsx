import { configureStore , combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import constructorReducer from "./slices/constructorSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import orderReducer from "./slices/orderSlice";
import currentIngredientReducer from "./slices/currentIngredientSlice";
import userReducer from "./slices/userSlice";
import feedReducer, {
  wsConnecting as wsConnectingOrders,
  wsOpen as wsOpenOrders,
  wsClose as wsCloseOrders,
  wsError as wsErrorOrders,
  wsMessage as wsMessageOrders,
  wsConnect as wsConnectOrders,
  wsDisconnect as wsDisconnectOrders
} from './slices/feedSlice';
import userOrdersReducer, {
  wsConnecting as wsConnectingUserOrders,
  wsOpen as wsOpenUserOrders,
  wsClose as wsCloseUserOrders,
  wsError as wsErrorUserOrders,
  wsMessage as wsMessageUserOrders,
  wsConnect as wsConnectUserOrders,
  wsDisconnect as wsDisconnectUserOrders
} from './slices/userOrdersSlice';
import { socketMiddleware } from "./middleware/socket-middleware";



const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  userOrders: userOrdersReducer,
});

const ordersMiddleware = socketMiddleware({
  connect: wsConnectOrders,
  disconnect: wsDisconnectOrders,
  wsConnecting: wsConnectingOrders,
  wsOpen: wsOpenOrders,
  wsClose: wsCloseOrders,
  wsError: wsErrorOrders,
  wsMessage: wsMessageOrders,
});

const userOrdersMiddleware = socketMiddleware({
  connect: wsConnectUserOrders,
  disconnect: wsDisconnectUserOrders,
  wsConnecting: wsConnectingUserOrders,
  wsOpen: wsOpenUserOrders,
  wsClose: wsCloseUserOrders,
  wsError: wsErrorUserOrders,
  wsMessage: wsMessageUserOrders,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersMiddleware, userOrdersMiddleware),
});


// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

// export const useDispatch = dispatchHook.withTypes<AppDispatch>()
// export const useSelector = selectorHook.withTypes<RootState>()

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
