import { useContext } from "react";
import moment from "moment";

import { AppContext } from '../contexts/appContext/appContext'

import { FireBaseNumberBox } from "../fireStore/Components/FireBaseNumberBox";
import { FireBaseTextBox } from "../fireStore/Components/FireBaseTextBox";
import { useProcessActions } from "../fireStore/hooks/processAction";
import { useCheckVersion } from '../fireStore/hooks/checkVersion'

import { useNotification } from "../fireStore/hooks/notificationHook";


export const ConfigArea = () => {
  const date = moment(new Date()).format("MM/DD/YYYY");
  useProcessActions(date);
  useCheckVersion()

  const { app: { isAdmin } = {}, user: { data: { showNames } = {}, setValue } = {} } = useContext(AppContext)
  const { setNotifications, isSupported, isRegistered, isLoading } = useNotification();

  const buttonText = isRegistered
    ? "Disable Notifications"
    : "Enable Notifications";

  const isLoadingClass = isLoading ? 'animated-gradient' : ''
  const selectedClass = isRegistered ? "selected" : ""

  return <div className="configGroup">
    <div className="inputs">
      <FireBaseTextBox field="Name" placeholder="Name" />
      <FireBaseTextBox field="Phone" placeholder="Phone #" />
      <div>Count: <FireBaseNumberBox field="Count" placeholder="Attendees" /></div>
    </div>

    {isSupported && (
      <div className={`notifications`}>
        <button className={`${isLoadingClass}`} disabled={isLoading} onClick={() => setNotifications(!isRegistered)}>
          {buttonText}
        </button>
      </div>
    )}

    {isAdmin &&
      <div className={`notifications`}>

        <button onClick={() => setValue({ showNames: !showNames })} >
          {showNames ? `Hide Names` : 'Show Names'}
        </button>
      </div>
    }

  </div>
}