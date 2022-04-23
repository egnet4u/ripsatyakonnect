import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
Sentry.init({
  dsn: "https://05530ef2eb854ffaa89d519fd990213f@o517650.ingest.sentry.io/5975308",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function (config) {
    if ("authToken" in localStorage) {
      config.headers.common.Authorization = `Bearer ${localStorage.authToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
