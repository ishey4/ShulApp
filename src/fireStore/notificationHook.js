import { useFireStore } from "./fireStoreHook"
import { getMessaging, getToken as _getToken, onMessage, deleteToken } from "firebase/messaging";


export const useNotification = (UID) => {
  const {
    data: { notificationsEnabled = false },
    setValue,
    updateData,
  } = useFireStore(UID);

  const enablePushNotifications = async () => {
    const msg = getMessaging();
    const _token = await _getToken(msg);

    setValue({ notificationToken: _token });
    onMessage(msg, updateData);
  };

  const setNotifications = (isEnabled) => {

    if (isEnabled) { enablePushNotifications() }
    else { deleteToken(getMessaging()) };
    
    setValue({ notificationsEnabled: isEnabled });
    updateData()
  }


  return { setNotifications, notificationsEnabled };
};