import moment from "moment";
import { useEffect } from "react";

import { useFireStore } from "./fireStoreHook";
import { useNotification } from './notificationHook'


export const useCheckVersion = (UID) => {
  const { data: appData } = useFireStore('appInfo');
  const { setNotifications } = useNotification(UID)

  const { currentSWVersion } = appData || {}

  useEffect(async () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      const [{ active: { scriptURL } = {} } = {}] = registrations || {};
      const installedSWVersion = scriptURL?.match?.(/(?:[^\.]+)/g)[1]

      if (installedSWVersion && currentSWVersion && installedSWVersion != currentSWVersion) {
        setNotifications(false).then(() => setNotifications(true, currentSWVersion))
      }
    });


  }, [appData]);
};
