import React from "react";
import ReactDOM from "react-dom/client";
import "../css/customBootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
