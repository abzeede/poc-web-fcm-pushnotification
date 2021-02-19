import { useState } from "react";
import { messaging } from "./init-fcm";
import "./App.css";

function App() {
  const [fcmToken, setFcmToken] = useState(null);
  const [notificationData, setNotificationData] = useState({});

  const registerPushNotification = () => {
    messaging
      .requestPermission()
      .then(async function () {
        // get fcm token
        const token = await messaging.getToken({
          vapidKey: process.env.REACT_APP_WEB_PUSH_CERTIFICATE_KEY,
        });
        setFcmToken(token);

        // foreground event message
        messaging.onMessage((payload) => {
          const data = JSON.parse(payload.data.default);
          setNotificationData(data);
        });

        // background event message
        navigator.serviceWorker.addEventListener("message", ({ data }) => {
          setNotificationData(
            data.data
              ? data.data
              : data["firebase-messaging-msg-data"].data.message
          );
        });
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
  };

  return (
    <div className="App">
      <div>
        <button onClick={registerPushNotification}>
          Register push notification
        </button>
      </div>
      <p>
        Token:
        <br /> {fcmToken} <br />
      </p>
      <p>
        Notification data: <br />
        {JSON.stringify(notificationData)}
      </p>
    </div>
  );
}

export default App;
