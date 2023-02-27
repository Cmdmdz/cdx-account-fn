import { server, HISTORY_CLEAR, HISTORY_FAILED, HISTORY_FETCHING, HISTORY_SUCCESS, USER_ID } from "../Constants";
import { HISTORY_PAYMENT } from "../types/account.type";
import { httpClient } from "../utils/httpclient";


export const setHistoryFetchingToState = () => ({
  type: HISTORY_FETCHING,
});

export const setHistorySuccessToState = (payload: HISTORY_PAYMENT[]) => ({
  type: HISTORY_SUCCESS,
  payload,
});

export const setHistoryFailedToState = () => ({
  type: HISTORY_FAILED,
});

export const setHistoryClearToState = () => ({
  type: HISTORY_CLEAR,
});


export const loadAccount = (userId: string) => {
  return (dispatch: any) => {
    dispatch(setHistoryFetchingToState());
    doGetHistoryPayment(userId,dispatch);
  };
};


const doGetHistoryPayment = async (userId: string,dispatch: any) => {
  try {
    const result = await httpClient.get<HISTORY_PAYMENT[]>(`${server.HISTORY_URL}/${userId}`);
    dispatch(setHistorySuccessToState(result.data));
  } catch (error) {
    dispatch(setHistoryFailedToState());
  }
};