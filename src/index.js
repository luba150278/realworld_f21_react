import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import NotFound from "./components/NotFound/NotFound";
import { Provider } from "react-redux";
import { store } from "./share/store";
import Layout from "./components/Layout/Layuot";
import Auth from "./components/Auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
  {
    path: "/auth",
    element: (
      <Layout>
        <Auth />
      </Layout>
    ),
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
