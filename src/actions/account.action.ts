import { server, ACCOUNT_CLEAR, ACCOUNT_FAILED, ACCOUNT_FETCHING, ACCOUNT_SUCCESS, USER_ID } from "../Constants";
import { ACCOUNT_LIST, CREATE_ACCOUNT, HISTORY_PAYMENT, UPDATE_PAYMENT } from "../types/account.type";
import { httpClient } from "../utils/httpclient";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const setAccountFetchingToState = () => ({
  type: ACCOUNT_FETCHING,
});

export const setAccountSuccessToState = (payload: ACCOUNT_LIST[]) => ({
  type: ACCOUNT_SUCCESS,
  payload,
});

export const setAccountFailedToState = () => ({
  type: ACCOUNT_FAILED,
});

export const setAccountClearToState = () => ({
  type: ACCOUNT_CLEAR,
});

export const loadAccount = (userId: string) => {
  return (dispatch: any) => {
    dispatch(setAccountFetchingToState());
    doGetAccounts(userId,dispatch);
  };
};


const doGetAccounts = async (userId: string,dispatch: any) => {
  try {
    const result = await httpClient.get<ACCOUNT_LIST[]>(`${server.ACCOUNT_URL}/${userId}`);
    dispatch(setAccountSuccessToState(result.data));
  } catch (error) {
    dispatch(setAccountFailedToState());
  }
};

export const createAccount = (data: CREATE_ACCOUNT,navigate: any) => {
  return async (dispatch: any) => {
    let userId = localStorage.getItem(USER_ID);
    await httpClient.post(`${server.ACCOUNT_URL}?userId=${userId}`, data);
    if (userId){
      await doGetAccounts(userId,dispatch);
  
    }
  };
};

export const updateAccount = (data: CREATE_ACCOUNT,accountId: number) => {
  return async (dispatch: any) => {
    let userId = localStorage.getItem(USER_ID);
    await httpClient.put(`${server.ACCOUNT_URL}/${accountId}`, data);
    if (userId){
      await doGetAccounts(userId,dispatch);
  
    }
  };
};

export const updatePayment = (data: UPDATE_PAYMENT,accountId: number,navigate: any) => {
  return async (dispatch: any) => {
    let userId = localStorage.getItem(USER_ID);
    await httpClient.put(`${server.PAYMENT_URL}/${accountId}`, data);
    if (userId){
      await doGetAccounts(userId,dispatch);
      navigate("/dashboard")
    }
  };
};

export const deleteAccount = (accountId: number) => {
  let userId = localStorage.getItem(USER_ID);

  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setAccountFetchingToState());
    await httpClient.delete(`${server.ACCOUNT_URL}/${accountId}`);
    if (userId){
      await doGetAccounts(userId,dispatch);
  
    }
  };
};

