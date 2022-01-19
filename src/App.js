import "./App.css";

import moment from "moment";

import { useNotification } from "./fireStore/hooks/notificationHook";
import { useFireStore } from "./fireStore/hooks/fireStoreHook";
import { FireBaseCheckbox } from "./fireStore/Components/FireBaseCheckBox";
import { FireBaseTextBox } from "./fireStore/Components/FireBaseTextBox";
import { useProcessActions } from "./fireStore/hooks/processAction";
import { Group } from "./Group/Group";
import { getId } from "./utils/getId";
import { getUpcomingDavenings } from './utils/getUpcomingDavening'



const id = getId();

const App = () => {
  const date = moment(new Date()).format("MM/DD/YYYY");

  const { setNotifications, isSupported, isRegistered } = useNotification(id);
  useProcessActions(id, date);

  const buttonText = isRegistered
    ? "Disable Notifications"
    : "Enable Notifications";

  const davenings = getUpcomingDavenings();

  return (
    <div className="App">
      <h1>
        <span>Minyan App</span>
      </h1>

      {davenings.map((a) => <Group {...a} />)}
      <div className="configGroup">
        <div className="nameInput">
          <FireBaseTextBox field="Name" placeholder="Name" UID={id} />
        </div>
        <div className={`notifications ${isRegistered ? "selected" : ""}`}>
          {isSupported && (
            <button onClick={() => setNotifications(!isRegistered)}>
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
