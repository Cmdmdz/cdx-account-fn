import {
    ACCOUNT_CLEAR,
    ACCOUNT_FAILED,
    ACCOUNT_FETCHING,
    ACCOUNT_SUCCESS,
  } from "../Constants";
  import { ACCOUNT_LIST } from "../types/account.type";
  
  export interface AccountState {
    result: ACCOUNT_LIST[];
    isFetching: boolean;
    isError: boolean;
  }
  
  const initialState: AccountState = {
    result: [],
    isFetching: false,
    isError: false,
  };
  
  export default (state = initialState, { type, payload }: any) => {
    switch (type) {
      case ACCOUNT_FETCHING:
        return { ...state, result: [], isFetching: true, isError: false };
      case ACCOUNT_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false };
      case ACCOUNT_FAILED:
        return { ...state, result: [], isFetching: false, isError: true };
      case ACCOUNT_CLEAR:
        return { ...state, result: [], isFetching: false, isError: false };
      default:
        return state;
    }
  };
  