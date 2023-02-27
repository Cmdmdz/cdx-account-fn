import {
  OK,
  LOGIN_FAILED,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  server,
  TOKEN,
  LOGOUT,
} from "../Constants";
import { httpClient } from "../utils/httpclient";
import { LoginResult } from "../types/authen.type";
import { User_login } from "../types/user.type";

export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload: LoginResult) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const setLogoutToState = () => ({
  type: LOGOUT,
});

export const login = (user: User_login, navigate: any) => {
  return async (dispatch: any) => {
    try {
      // begin connecting...
      dispatch(setLoginFetchingToState());
      // connect
      const result = await httpClient.post<LoginResult>(server.LOGIN_URL, user);
      if (result.status === 200 && result.data.token != null) {
        setTimeout(() => {
          localStorage.setItem(TOKEN, result.data.token!);
          localStorage.setItem("userId", result.data.userId!);
          localStorage.setItem("role", result.data.role!);

          dispatch(setLoginSuccessToState(result.data));
          alert("Login Successfully");
          navigate("/dashboard");
        }, 1000);
      } else {
        dispatch(setLoginFailedToState());
      }
    } catch (error) {
      // error
      dispatch(setLoginFailedToState());
    }
  };
};

export const restoreLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(TOKEN);
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (token && userId && role) {
      dispatch(
        setLoginSuccessToState({
          result: OK,
          token,
          userId,
          role,
          message: "Login successfully",
        })
      );
    }
  };
};

export const logout = (navigate: any) => {
  return (dispatch: any) => {
    localStorage.removeItem(TOKEN);
    dispatch(setLogoutToState());
    alert("Logout successfully");
    navigate("/login");
  };
};
