import { useState, useEffect, useContext } from "react";
import {
  getMessaging,
  getToken as _getToken,
  isSupported,
} from "firebase/messaging";


import { AppContext } from '../../contexts/appContext/appContext'
import { serviceWorkerPath } from '../../fireBase'


export const useNotification = () => {
  const { user, app } = useContext(AppContext);

  const {
    data: {
      userSWVersion,
      notificationsEnabled,
      isLoading: fireBaseLoading
    } = {},
    setValue
  } = user

  const { data: { currentSWVersion, isLoading: isDbLoading } = {} } = app;


  const [_isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const checkIfRegistered = () =>
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      const installedSWVersion = registrations?.[0]?.active?.scriptURL?.match?.(/(?:(prod|dev)[^\.]+)/g)[0]

      setIsRegistered(!!registrations.length);

      if (currentSWVersion && (userSWVersion != installedSWVersion || currentSWVersion != installedSWVersion)) {
        setValue({ userSWVersion: installedSWVersion })
      }
    });

  const enablePushNotifications = (serviceWorkerURL = '') => navigator.serviceWorker
    .register(serviceWorkerPath(serviceWorkerURL || currentSWVersion))
    .then(async (registration) => {
      const msg = getMessaging();
      const tkn = await _getToken(msg, { serviceWorkerRegistration: registration });
      setValue({ token: tkn, notificationsEnabled: true })
      checkIfRegistered();
      return tkn;
    });

  const unregister = async () => {
    await navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach(registration => {
        registration.unregister().then(() => setValue({ token: null, notificationsEnabled: false }))
      })
    }
    );

    checkIfRegistered();

    return null;
  };

  const setNotifications = async (isEnabled, serviceWorkerURL = "") => {
    setIsLoading(true)
    const token = isEnabled
      ? await enablePushNotifications(serviceWorkerURL)
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
