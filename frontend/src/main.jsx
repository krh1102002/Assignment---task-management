import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Set the authorization header if userToken exists in localStorage
if (localStorage.userToken) {
  const { userToken } = JSON.parse(localStorage.userToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
}

// Retrieve the client ID from the Vite environment variables
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
