import {
    CONTACT_CLEAR,
    CONTACT_FAILED,
    CONTACT_FETCHING,
    CONTACT_SUCCESS,
  } from "../Constants";
import { CONTACT } from "../types/contact.type";
  
  export interface ContactState {
    result: CONTACT[];
    isFetching: boolean;
    isError: boolean;
  }
  
  const initialState: ContactState = {
    result: [],
    isFetching: false,
    isError: false,
  };
  
  export default (state = initialState, { type, payload }: any) => {
    switch (type) {
      case CONTACT_FETCHING:
        return { ...state, result: [], isFetching: true, isError: false };
      case CONTACT_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false };
      case CONTACT_FAILED:
        return { ...state, result: [], isFetching: false, isError: true };
      case CONTACT_CLEAR:
        return { ...state, result: [], isFetching: false, isError: false };
      default:
        return state;
    }
  };
  