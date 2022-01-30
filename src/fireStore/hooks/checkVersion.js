import { useContext, useEffect } from "react";

import { AppContext } from "../../contexts/appContext/appContext";

import { useNotification } from './notificationHook'


export const useCheckVersion = () => {
  const { setNotifications } = useNotification()

  const { app: { data: appData } } = useContext(AppContext)

  const { currentSWVersion } = appData || {}

  useEffect(async () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      const [{ active: { scriptURL } = {} } = {}] = registrations || {};
      const installedSWVersion = scriptURL?.match?.(/(?:[^\.]+)/g)[1]

      if (installedSWVersion && currentSWVersion && installedSWVersion != currentSWVersion) {
        setNotifications(false).then(() => setNotifications(true, currentSWVersion))
      }
    });


  }, [currentSWVersion]);
};
