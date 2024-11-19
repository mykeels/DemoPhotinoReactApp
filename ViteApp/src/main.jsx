import "./index.css";

import ReactDOM from "react-dom/client";
import { HashRouter, MemoryRouter, BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const Router = import.meta.env.REACT_APP_USE_HASH_ROUTER
  ? HashRouter
  : typeof window === "undefined"
  ? MemoryRouter
  : BrowserRouter;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router basename={import.meta.env.PUBLIC_URL || "/"}>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);