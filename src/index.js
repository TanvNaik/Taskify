import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routers from "./Routers";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Routers />
  </StrictMode>
);


