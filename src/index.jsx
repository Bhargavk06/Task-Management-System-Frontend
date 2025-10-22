import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Be explicit and use .jsx here too!
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);