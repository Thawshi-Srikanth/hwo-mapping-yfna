import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PlanetContextProvider from "./context/planets/PlanetContextProvider.tsx";
import ToolContextProvider from "./context/tools/ToolContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlanetContextProvider>
      <ToolContextProvider>
        <App />
      </ToolContextProvider>
    </PlanetContextProvider>
  </StrictMode>
);
