import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./modules";
import { Provider } from 'react-redux';
import { store } from "./app/store";

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

window.dispatchPayload = (payload) => {
  store.dispatch(payload);
}
