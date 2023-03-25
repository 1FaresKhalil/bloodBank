import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/index";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
