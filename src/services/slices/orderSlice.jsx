import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/API";

const initialState = {
  ingredients: [],
  order: {},
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setInredients: (state, action) => {
      const { ingredientsId } = action.payload;
      state.ingredients = ingredientsId;
    },
    getOrderDetails: (state, action) => {
        state.order = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setInredients, getOrderDetails,setLoading,setSuccess,setError } = orderSlice.actions;

export const createOrder = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    
    try {
      const res = await fetch(`${BASE_URL}/orders`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify({
            ingredients: data
          })
      });
  
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await res.json();
  
      dispatch(setSuccess(true));
      dispatch(setLoading(false));
      dispatch(getOrderDetails(responseData))
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };


export default orderSlice.reducer;
