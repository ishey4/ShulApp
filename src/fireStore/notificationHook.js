import { useState, useEffect } from 'react'
import { useFireStore } from "./fireStoreHook"
import { getMessaging, getToken as _getToken, onMessage, deleteToken, isSupported  } from "firebase/messaging";

const broadcast = new BroadcastChannel('channel-123');

export const useNotification = (UID) => {
  const {
    data: { notificationsEnabled = false } = {},
    setValue,
    updateData,
  } = useFireStore(UID);

  const [_isSupported, setIsSupported] = useState(false)

  const enablePushNotifications = () =>{
    const { protocol, host, pathname } = window.location
   return navigator.serviceWorker.register(`${protocol}//${host}${pathname}/firebase-messaging-sw.js`)
      .then((registration) => {
        const msg = getMessaging();
        broadcast.postMessage({ action: "SET_ID", payload: UID })
        return _getToken(msg, { serviceWorkerRegistration: registration })
      });

  }

  const unregister = async () => {
    const { protocol, host, pathname } = window.location
    const sw = await navigator.serviceWorker.getRegistration(`${protocol}//${host}${pathname}/firebase-messaging-sw.js`)
    sw?.unregister();
    return null
   }

 

  const setNotifications = async (isEnabled) => {
    const msg = getMessaging()

    
    const token = isEnabled ? await enablePushNotifications() : await unregister();  
    
    setValue({ notificationsEnabled: isEnabled, token });
    updateData()
  }

  useEffect(() => {
    setIsSupported(isSupported())
   },[])


  return { setNotifications, notificationsEnabled, isSupported:_isSupported };
};