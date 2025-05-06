import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { system } from "@chakra-ui/react/preset";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
