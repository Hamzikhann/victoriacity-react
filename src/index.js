import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./Entryfile/Main";
import { persistor, store } from "./store"
window.Popper = require("popper.js").default;
import {  ToastContainer } from "react-toastify";


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
            <Main />
        </PersistGate>
    </Provider>
    , document.getElementById('app'));

if (module.hot) { // enables hot module replacement if plugin is installed
    module.hot.accept();
}