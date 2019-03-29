import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { Router } from "react-router-dom";
import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import logger from "redux-logger";
import rootReducer from "./reducers";
import RouterControl from "./router.jsx";
import './styles/reset.css';
import './styles/flex.css';
import './styles/media.css';
import './styles/antd.css';
import './app.css';

moment.locale('zh-cn');

const browserHistory = createBrowserHistory();
const browserHistoryMiddleware = routerMiddleware(browserHistory)
const middlewares = [];
// 开发环境打印日志
// if (process.env.NODE_ENV === `development`) {
//   middlewares.push(logger);
// }
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk, browserHistoryMiddleware))
);
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Router history={history}>
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <RouterControl />
      </LocaleProvider>
    </Provider>
  </Router>
  ,
  document.getElementById("root")
);

