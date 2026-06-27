import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";
import "leaflet/dist/leaflet.css";

import "./index.css";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.log(err));
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <BrowserRouter>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />

    <App />

  </BrowserRouter>
);
