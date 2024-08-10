import userOrdersReducer, {
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage
  } from "../../services/slices/userOrdersSlice";
  
  describe("userOrdersSlice reducer", () => {
    const initialState= {
      userOrders: {
        orders: [],
        success: false,
        total: null,
        totalToday: null
      },
      status: "disconnected",
      error: null,
    };
  
    it("should handle wsConnecting", () => {
      const nextState = userOrdersReducer(initialState, wsConnecting());
      expect(nextState.status).toBe("connecting");
    });
  
    it("should handle wsOpen", () => {
      const nextState = userOrdersReducer(initialState, wsOpen());
      expect(nextState.status).toBe("connected");
    });
  
    it("should handle wsClose", () => {
      const nextState = userOrdersReducer(initialState, wsClose());
      expect(nextState.status).toBe("disconnected");
    });
  
    it("should handle wsError", () => {
      const error = "Connection error";
      const nextState = userOrdersReducer(initialState, wsError(error));
      expect(nextState.status).toBe("error");
      expect(nextState.error).toBe(error);
    });
  
    it("should handle wsMessage", () => {
      const ordersObject = {
        orders: [{ _id: "1", name: "Order 1", ingredients: ["123", "456"] }],
        success: true,
        total: 100,
        totalToday: 10,
      };
      const nextState = userOrdersReducer(initialState, wsMessage(ordersObject));
      expect(nextState.userOrders).toEqual(ordersObject);
    });
  });
  