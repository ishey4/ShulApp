

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js');

const broadcast = new BroadcastChannel('channel-123');

let id = '';

broadcast.onmessage = ({ data }) => {
    const { action, payload } = data;
    if (action === "SET_ID") {
        id = payload;
    }
}

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBTYpqPswzYpqIlf-sfdLoDJroew3hPBCM",
    authDomain: "shulapp.firebaseapp.com",
    projectId: "shulapp",
    storageBucket: "shulapp.appspot.com",
    messagingSenderId: "329842802875",
    appId: "1:329842802875:web:77da65c4775da3d9f8a99e",
    measurementId: "G-9HFJLK9Y6X"
});

const messaging = firebase.messaging()

const closeAllNotifications = () => self.registration
    .getNotifications()
    .then((notifications) => {
        notifications.
            forEach(notification => {
                notification.close()
            })
    })



messaging.onBackgroundMessage((payload) => {
    const { data: { title = 'Minyan', body = `Message body.`, minyan } } = payload || {}

    const notificationOptions = {
        body,
        data: payload,
        icon: '/firebase-logo.png',
        actions: [
            { action: 'Yes', title: 'Yes', minyan },
            { action: 'Maybe', title: 'Maybe', minyan },
            { action: 'No', title: 'No', minyan },
        ]
    };
    closeAllNotifications()
    self.registration.showNotification(title,
        notificationOptions);
});


self.addEventListener('notificationclick', (e) => {
    const { action, notification: { data: { data: payload } } } = e
    console.log("in middleman event", { action, payload, e })

    self.clients.openWindow(`/ShulApp?action=${action}&minyan=${payload?.minyan}`).then((data) => {
        console.log('data', { data })
        broadcast.postMessage({ action, payload })
        closeAllNotifications();
    });
});