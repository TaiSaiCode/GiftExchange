import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Fixed by import: need to install bootsrap first using npm i --save bootstrap
import { CookiesProvider } from "react-cookie";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);
