// [START messaging_init_in_sw]
importScripts("https://www.gstatic.com/firebasejs/3.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.7.1/firebase-messaging.js");

// initialize firebase app
firebase.initializeApp({
  messagingSenderId: "407982577548", // TODO: use env value
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  return clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload); // send message from service worker to client
      }
    })
    .then(() => {
      /**
       * example data from Amazon SNS {"data":{"default":"{\"title\": \"fdsa\", \"content\": \"fdafdsa\", \"url\": \"www.google.com\"}"},"from":"407982577548","priority":"normal","collapse_key":"do_not_collapse"}
       */
      const data = JSON.parse(payload.data.default);
      return registration.showNotification(data.title, {
        body: data.content,
        data: {
          url: data.url,
        },
      });
    });
});

// register notification click event
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
