import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Tipagem para o elemento DOM onde o React será renderizado
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Criação do root com tipagem explícita
const root = ReactDOM.createRoot(rootElement);

// Renderização do aplicativo com React.StrictMode e BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
