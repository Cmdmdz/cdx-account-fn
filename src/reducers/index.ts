import { combineReducers } from "redux";
import registerReducer, { RegisterState } from "./register.reducer";
import loginReducer, { LoginState } from "./login.reducer";
import accountReducer, { AccountState } from "./account.reducer";
import historyReducer, { HistoryState } from "./history.reducer";
import contactReducer, { ContactState } from "./contact.reducer";

export default combineReducers({
  registerReducer,
  loginReducer,
  accountReducer,
  historyReducer,
  contactReducer
});

export interface RootReducers {
  registerReducer: RegisterState;
  loginReducer: LoginState;
  accountReducer: AccountState;
  historyReducer: HistoryState;
  contactReducer: ContactState;

}
