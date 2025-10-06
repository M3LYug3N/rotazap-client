"use client";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const ToastComponent = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    draggable
    pauseOnHover
    theme="colored"
  />
);
