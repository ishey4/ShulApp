import "./App.css";

import moment from "moment";

import { useNotification } from "./fireStore/hooks/notificationHook";
import { FireBaseTextBox } from "./fireStore/Components/FireBaseTextBox";
import { useProcessActions } from "./fireStore/hooks/processAction";
import { Group } from "./Group/Group";
import { getId } from "./utils/getId";
import { getUpcomingDavenings } from './utils/getUpcomingDavening'



const id = getId();

const App = () => {
  const date = moment(new Date()).format("MM/DD/YYYY");
  const davenings = getUpcomingDavenings();

  const { setNotifications, isSupported, isRegistered } = useNotification(id);
  useProcessActions(id, date);

  const buttonText = isRegistered
    ? "Disable Notifications"
    : "Enable Notifications";


  return (
    <div className="App">
      <h1>Minyan App</h1>
      {davenings.map((davening) => <Group {...davening} />)}
      <div className="configGroup">
        <div className="inputs">
          <FireBaseTextBox field="Name" placeholder="Name" UID={id} />
          <FireBaseTextBox field="Phone" placeholder="Phone #" UID={id} />
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
