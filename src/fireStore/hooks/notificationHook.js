import { useState, useEffect } from "react";

import { serviceWorkerPath } from '../../fireBase'
import {
  getMessaging,
  getToken as _getToken,
  isSupported,
} from "firebase/messaging";

import { useFireStore } from "./fireStoreHook";

export const useNotification = (UID) => {
  const {
    data: {
      notificationsEnabled = false,
      isLoading: fireBaseLoading
    } = {},
    setValue } = useFireStore(UID);

  const [_isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const checkIfRegistered = () =>
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      setIsRegistered(!!registrations.length && notificationsEnabled);
    });

  const enablePushNotifications = () => navigator.serviceWorker
    .register(serviceWorkerPath)
    .then(async (registration) => {
      const msg = getMessaging();
      const tkn = await _getToken(msg, { serviceWorkerRegistration: registration });
      setValue({ token: tkn, notificationsEnabled: true })
      checkIfRegistered();
      return tkn;
    });

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
    setIsLoading(true)
    const token = isEnabled
      ? await enablePushNotifications()
      : await unregister();

    setValue({ notificationsEnabled: isEnabled, token });
    setIsLoading(false)
  };

  useEffect(() => {
    setIsSupported(isSupported());
    checkIfRegistered();
  }, [notificationsEnabled]);

  return {
    setNotifications,
    notificationsEnabled,
    isSupported: _isSupported,
    isRegistered,
    isLoading: isLoading || fireBaseLoading
  };
};
