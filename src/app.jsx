import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import rootReducer from "./reducers";
import RouterControl from "./router.jsx";

import "./app.css";
const browserHistory = createBrowserHistory();
const browserHistoryMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, browserHistoryMiddleware))
);
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    <RouterControl history={history} />
  </Provider>,
  document.getElementById("root")
);

