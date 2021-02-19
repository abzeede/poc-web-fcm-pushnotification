import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { messaging } from "./init-fcm";

function App() {
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState({});

  const registerPushListener = () =>
    navigator.serviceWorker.addEventListener("message", ({ data }) => {
      console.log(data);
      setNotification(
        data.data ? data.data : data["firebase-messaging-msg-data"].data.message
      );
    });

  useEffect(() => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken({
          vapidKey: process.env.REACT_APP_WEB_PUSH_CERTIFICATE_KEY,
        });
        setToken(token);
        messaging.onMessage((payload) => {
          alert(JSON.stringify(payload));
        });
        registerPushListener();
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Token:
          <br /> {token} <br />
          Notification: {JSON.stringify(notification)}
        </p>
      </header>
    </div>
  );
}

export default App;
