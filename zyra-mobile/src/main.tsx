import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SplashScreen } from "@capacitor/splash-screen";
import "./index.css";
import AppMain from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const initSplash = async () => {
  await SplashScreen.show({
    showDuration: 2000,
    autoHide: true,
  });
};

initSplash();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppMain />
    </BrowserRouter>
  </StrictMode>,
);
