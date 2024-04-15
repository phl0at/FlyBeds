import { Modal, ModalProvider } from "./context/Modal";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import configureStore from "./store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
