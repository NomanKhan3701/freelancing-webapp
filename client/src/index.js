import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import "./assets/css/grid.css";
import "./assets/css/root.css";
import App from "./App";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import store from "./app/store";
import { Provider } from "react-redux";
import "./";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
