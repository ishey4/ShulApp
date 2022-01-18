importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";


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

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
        actions: [
            { action: '', title: 'Yes' },
            { action: '', title:'No'}
            
        ]
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});


self.addEventListener('notificationclick', (data) => {
    console.log("notification clicked", {data})
})