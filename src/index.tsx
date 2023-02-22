import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Middleware } from 'redux';
import reducers from "./reducers";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from "redux-logger";


let middlewares: Middleware[] = [thunkMiddleware];

if (process.env.REACT_APP_IS_PRODUCTION !== "1") {
  middlewares.push(logger);
}

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares))
export const store = createStore(
  reducers,
  composedEnhancer
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
