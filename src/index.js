import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './configureStore';
import OpenBookSocket from './utils/openBookSocket';
import { ConfigProvider, theme } from 'antd';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

const store = configureStore();
//const openBookSocket = new OpenBookSocket(store);
//store.dispatch({type:"SET_OPENBOOKCONNECTION", openBookSocket:openBookSocket});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
            <ConfigProvider
            theme={{
              // 1. Use dark algorithm
              algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#2abdd2',
            colorLink: '#05faee',
            borderRadius: '0px',
          },

              // 2. Combine dark algorithm and compact algorithm
              // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
          >
            <App />
        </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
