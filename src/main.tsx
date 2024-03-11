import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/pages/App.tsx'
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import store from "@/store/store";
import "@/shared/styles/globals.scss";
import "@/shared/styles/_root.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <ToastContainer
              position="top-right"
              autoClose={4000}
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
      </Provider>
  </React.StrictMode>,
)
