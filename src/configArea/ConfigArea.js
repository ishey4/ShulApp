import { FireBaseNumberBox } from "../fireStore/Components/FireBaseNumberBox";
import { FireBaseTextBox } from "../fireStore/Components/FireBaseTextBox";

import { useNotification } from "../fireStore/hooks/notificationHook";


export const ConfigArea = ({ UID: id }) => {

  const { setNotifications, isSupported, isRegistered, isLoading } = useNotification(id);
  const buttonText = isRegistered
    ? "Disable Notifications"
    : "Enable Notifications";

  const isLoadingClass = isLoading ? 'animated-gradient' : ''
  const selectedClass = isRegistered ? "selected" : ""

  return <div className="configGroup">
    <div className="inputs">
      <FireBaseTextBox field="Name" placeholder="Name" UID={id} />
      <FireBaseTextBox field="Phone" placeholder="Phone #" UID={id} />
      <div>Count: <FireBaseNumberBox field="Count" placeholder="Attendees" UID={id} /></div>
    </div>
    <div className={`notifications ${selectedClass} ${isLoadingClass}`}>
      {isSupported && (
        <button disabled={isLoading} onClick={() => setNotifications(!isRegistered)}>
          {buttonText}
        </button>
      )}
    </div>
  </div>
}