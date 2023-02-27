import { server, CONTACT_CLEAR, CONTACT_FAILED, CONTACT_FETCHING, CONTACT_SUCCESS, USER_ID } from "../Constants";
import { httpClient } from "../utils/httpclient";
import { CONTACT } from "../types/contact.type";
import { AnyAction, Dispatch } from "redux";

export const setContactFetchingToState = () => ({
  type: CONTACT_FETCHING,
});

export const setContactuccessToState = (payload: CONTACT[]) => ({
  type: CONTACT_SUCCESS,
  payload,
});

export const setContactFailedToState = () => ({
  type: CONTACT_FAILED,
});

export const setContactClearToState = () => ({
  type: CONTACT_CLEAR,
});


export const loadContact = () => {
  return (dispatch: any) => {
    dispatch(setContactFetchingToState());
    doGetContact(dispatch);
  };
};


const doGetContact = async (dispatch: any) => {
  try {
    const result = await httpClient.get<CONTACT[]>(`${server.CONTACT_URL}`);
    dispatch(setContactuccessToState(result.data));
  } catch (error) {
    dispatch(setContactFailedToState());
  }
};

export const feedback = (data: CONTACT,navigate: any) => {
    return async (dispatch: any) => {
      let userId = localStorage.getItem(USER_ID);
      await httpClient.post(`${server.CONTACT_URL}/${userId}`, data);
      navigate("/dashboard");
    };
  };

  export const deleteAccount = (contactId: number) => {
    let userId = localStorage.getItem(USER_ID);
  
    return async (dispatch: Dispatch<AnyAction>) => {
      dispatch(setContactFetchingToState());
      await httpClient.delete(`${server.CONTACT_URL}/${contactId}`);
      if (userId){
        await doGetContact(dispatch);
    
      }
    };
  };
  