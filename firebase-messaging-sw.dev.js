

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js');


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyClqfxLXXrCi05d-A_2w6faXD0alFITbVQ",
    authDomain: "shuldev-7cc85.firebaseapp.com",
    projectId: "shuldev-7cc85",
    storageBucket: "shuldev-7cc85.appspot.com",
    messagingSenderId: "411280276543",
    appId: "1:411280276543:web:bff305ebf0addbe5a10c8a"
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
            { action: 'No', title: 'No', minyan },
        ]
    };

    closeAllNotifications()

    self.registration.showNotification(title, notificationOptions);
});


self.addEventListener('notificationclick', (e) => {
    const { action, notification: { data: { data: { minyan, dateOffset } } } } = e

    self.clients.openWindow(`/ShulApp?action=${action}&minyan=${minyan}&dateOffset=${dateOffset}&env=dev`).then(closeAllNotifications);
});