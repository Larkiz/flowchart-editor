import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

import reportWebVitals from "./reportWebVitals";
import { Flow } from "./Flow";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from "react-i18next";

import i18n from "./localization/i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <Flow />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
