import {
    HISTORY_CLEAR,
    HISTORY_FAILED,
    HISTORY_FETCHING,
    HISTORY_SUCCESS,
  } from "../Constants";
  import { HISTORY_PAYMENT } from "../types/account.type";
  
  export interface HistoryState {
    result: HISTORY_PAYMENT[];
    isFetching: boolean;
    isError: boolean;
  }
  
  const initialState: HistoryState = {
    result: [],
    isFetching: false,
    isError: false,
  };
  
  export default (state = initialState, { type, payload }: any) => {
    switch (type) {
      case HISTORY_FETCHING:
        return { ...state, result: [], isFetching: true, isError: false };
      case HISTORY_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false };
      case HISTORY_FAILED:
        return { ...state, result: [], isFetching: false, isError: true };
      case HISTORY_CLEAR:
        return { ...state, result: [], isFetching: false, isError: false };
      default:
        return state;
    }
  };
  