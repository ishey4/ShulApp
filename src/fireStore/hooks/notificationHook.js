import { useState, useEffect } from "react";
import { useFireStore } from "./fireStoreHook";
import {
  getMessaging,
  getToken as _getToken,
  onMessage,
  deleteToken,
  isSupported,
} from "firebase/messaging";

const broadcast = new BroadcastChannel("channel-123");

export const useNotification = (UID) => {
  const { data: { notificationsEnabled = false } = {}, setValue } =
    useFireStore(UID);

  const [_isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const checkIfRegistered = () =>
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      setIsRegistered(!!registrations.length);
    });

  const enablePushNotifications = () => {
    const { protocol, host, pathname } = window.location;
    return navigator.serviceWorker
      .register(`${protocol}//${host}${pathname}/firebase-messaging-sw.js`)
      .then((registration) => {
        const msg = getMessaging();
        broadcast.postMessage({ action: "SET_ID", payload: UID });
        const tkn = _getToken(msg, { serviceWorkerRegistration: registration });
        checkIfRegistered();
        return tkn;
      });
  };

  const unregister = async () => {
    const { protocol, host, pathname } = window.location;
    const sw = await navigator.serviceWorker.getRegistration(
      `${protocol}//${host}${pathname}/firebase-messaging-sw.js`
    );
    await sw?.unregister();
    checkIfRegistered();
    return null;
  };

  const setNotifications = async (isEnabled) => {
    const token = isEnabled
      ? await enablePushNotifications()
      : await unregister();
    setValue({ notificationsEnabled: isEnabled, token });
  };

  useEffect(() => {
    setIsSupported(isSupported());
    checkIfRegistered();
  }, []);

  return {
    setNotifications,
    notificationsEnabled,
    isSupported: _isSupported,
    isRegistered,
  };
};
