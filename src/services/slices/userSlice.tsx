import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWithRefresh, request } from "../../utils/requests";
import { BASE_URL } from "../../utils/API";
import { IFormValues } from "../../utils/types/types";
import { AppDispatch } from "../store";

interface IUser {
  name: string;
  email: string;
}
interface IUserInitialState {
  isAuth: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  user: IUser;
}

const initialState: IUserInitialState = {
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
    setUser: (
      state,
      action: PayloadAction<{ user: IUser; isAuth: boolean }>
    ) => {
      const { user, isAuth } = action.payload;
      state.isAuth = isAuth;
      state.user = user;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { setUser, setLoading, setSuccess, setError } = userSlice.actions;

export const registerUser =
  ({ name, email, password }: IFormValues) =>
  async (dispatch: AppDispatch) => {
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
      dispatch(setUser({ user: createUser, isAuth: true }));
      localStorage.setItem("refreshToken", createUser.refreshToken);
      localStorage.setItem("accessToken", createUser.accessToken);
    } catch (error) {
      console.log(error, "Create user error");
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  };

export const loginUser =
  ({ email, password }: IFormValues) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const userLogin = await request(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });
      dispatch(setUser({ user: userLogin, isAuth: true }));
      dispatch(setLoading(false));
      localStorage.setItem("refreshToken", userLogin.refreshToken);
      localStorage.setItem("accessToken", userLogin.accessToken);
    } catch (error) {
      console.log(error, "Login user error");
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  };

export const LogOutUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    const user = { name: "", email: "" };
    dispatch(
      setUser({
        user: user,
        isAuth: false,
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(true));
    dispatch(setLoading(false));
  }
};

export const getUser = () => async (dispatch: AppDispatch) => {
  const token: string | null = localStorage.getItem("accessToken");
  dispatch(setLoading(true));

  if (!token) {
    dispatch(setError(true));
    return;
  }

  try {
    const userData = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    dispatch(setUser({ user: userData.user, isAuth: true }));;
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(true));
    dispatch(setLoading(false));
  }
};

export const editUserProfile =
  ({ name, email, password }: IFormValues) =>
  async (dispatch: AppDispatch) => {
    const token: string | null = localStorage.getItem("accessToken");

    if (!token) {
      dispatch(setError(true));
      return;
    }

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
      dispatch(setUser({ user: userData, isAuth: true }));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  };
export default userSlice.reducer;
