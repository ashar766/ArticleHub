import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationToast from "./components/NotificationToast";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <NotificationProvider>
        <NotificationToast />

        <App />
      </NotificationProvider>
    </AuthProvider>
  </BrowserRouter>,
);
