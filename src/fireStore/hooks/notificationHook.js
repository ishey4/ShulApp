import { useState, useEffect } from "react";

import { serviceWorkerPath } from '../../fireBase'
import {
  getMessaging,
  getToken as _getToken,
  isSupported,
} from "firebase/messaging";

import { useFireStore } from "./fireStoreHook";

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
    console.log("serviceWorkerPath", { serviceWorkerPath })

    return navigator.serviceWorker
      .register(serviceWorkerPath)
      .then((registration) => {
        const msg = getMessaging();
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
