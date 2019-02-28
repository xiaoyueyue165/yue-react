import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import rootReducer from "./reducers";
import RouterControl from "./router.jsx";

import "./app.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

render(
  <Provider store={store}>
    <RouterControl />
  </Provider>,
  document.getElementById("root")
);

