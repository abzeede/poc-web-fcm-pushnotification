// [START messaging_init_in_sw]
importScripts("https://www.gstatic.com/firebasejs/3.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.7.1/firebase-messaging.js");

// initialize firebase app
firebase.initializeApp({
  messagingSenderId: "407982577548",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      const data = JSON.parse(payload.data.default);
      console.log(payload);
      return registration.showNotification(data.title, {
        body: data.content,
        data: {
          url: data.url,
        },
      });
    });
  return promiseChain;
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
