import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import { store } from "./redux/store";
import { GlobalStyle, theme } from "./style";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
