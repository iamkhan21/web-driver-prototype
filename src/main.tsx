import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@assets/styles/main.pcss";
import "@application";
import "uno.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
