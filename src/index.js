import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./firebase-messaging-sw.js")
      .then(function () {
        console.log("Service worker registration successful");
      })
      .catch(function (err) {
        console.log("Service worker registration failed: ", err);
      });
  }
};

// register service worker
registerServiceWorker();

ReactDOM.render(<App />, document.getElementById("root"));
