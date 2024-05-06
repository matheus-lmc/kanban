import React from "react";
import ReactDOM from "react-dom/client";

import { CardsProvider } from "./contexts/cards.tsx";
import App from "./App.tsx";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CardsProvider>
      <App />
    </CardsProvider>
  </React.StrictMode>
);
