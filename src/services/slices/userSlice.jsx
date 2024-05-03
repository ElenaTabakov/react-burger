import { createSlice } from "@reduxjs/toolkit";
import { fetchWithRefresh, request } from "../../utils/requests";
import { BASE_URL } from "../../utils/API";
import { Navigate } from "react-router-dom";

const initialState = {
  isAuth: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: {
    name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      const { user, auth } = action.payload;
      state.isAuth = auth;
      state.user.name = user.user.name;
      state.user.email = user.user.email;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const { setUser, setLoading, setSuccess, setError } = userSlice.actions;

export const registerUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const createUser = await request(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      dispatch(setSuccess(true));
      dispatch(setLoading(false));
      dispatch(setUser({ user: createUser, auth: true }));
      localStorage.setItem("refreshToken", createUser.refreshToken);
      localStorage.setItem("accessToken", createUser.accessToken);
    } catch (error) {
      console.log(error, "Create user error");
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  };

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userLogin = await request(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });
      dispatch(setUser({ user: userLogin, auth: true }));
      dispatch(setLoading(false));
      localStorage.setItem("refreshToken", userLogin.refreshToken);
      localStorage.setItem("accessToken", userLogin.accessToken);
    } catch (error) {
      console.log(error, "Login user error");
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  };

export const LogOutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    const user = { name: "", email: "" };
    dispatch(
      setUser({
        user: { user },
        auth: false,
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(true));
    dispatch(setLoading(false));
  }
};

export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem("accessToken");
  dispatch(setLoading(true));
  try {
    const userData = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    dispatch(setUser({ user: userData, auth: true }));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(true));
    dispatch(setLoading(false));
  }
};

export const editUserProfile =
  ({ name, email, password }) =>
  async (dispatch) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return <Navigate to="/login" />;
    } else {
      dispatch(setLoading(true));
      try {
        const userData = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({ name, email, password }),
        });
        console.log(userData, "userSlice");
        dispatch(setUser(userData.user));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(true));
        dispatch(setLoading(false));
        <Navigate to="/login" />;
      }
    }
  };
export default userSlice.reducer;
