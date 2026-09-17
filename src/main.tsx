import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { registerSW } from "virtual:pwa-register";

import "./index.css";
import App from "./App.tsx";

// Active automatiquement les mises à jour de la PWA
registerSW({
  immediate: true,
});

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <App />
  </StrictMode>
);