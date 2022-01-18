importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";


const broadcast = new BroadcastChannel('channel-123');

broadcast.onMessage = ({ action, payload }) => {
    
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

const closeAllNotifications = () => 
    self.registration.getNotifications()
        .then((notifications) => {
            notifications.
                forEach(notification => {
                    notification.close()
                })
        })


const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    const { data: { title = 'Minyan', body = `Message body.`, minyan } } = payload || {}

    const notificationOptions = {
        body,
        data:payload,
        icon: '/firebase-logo.png',
        actions: [
            { action: 'PUSH_YES', title: 'Yes', minyan },
            { action: 'PUSH_NO', title:'No', minyan}     
        ]
    };
    closeAllNotifications()
    self.registration.showNotification(title,
        notificationOptions);
});


self.addEventListener('notificationclick', function (e) {
    const { action, notification: { data: { data: payload } } } = e
    console.log("in middleman event", { action, payload, e })
    broadcast.postMessage({ action, payload})
});