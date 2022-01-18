import './App.css';

import moment from 'moment'

import { useNotification } from './fireStore/notificationHook';
import { useFireStore } from './fireStore/fireStoreHook';
import { FireBaseCheckbox } from './fireStore/FireBaseCheckBox';
import { FireBaseTextBox } from './fireStore/FireBaseTextBox'
import { useGetAttendance } from './fireStore/getAttendance';
import { uuidv4 } from './utils'
import { useProcessActions } from './fireStore/processAction'

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  //showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  alert(`'beforeinstallprompt' event was fired.`);
});

const getId = () => {
  const id = window.localStorage.getItem('id') || uuidv4();
  localStorage.setItem('id', id)
  return id
 }

const id = getId();

const App = () => {
  const date = moment(new Date()).format("MMDDYYYY")

  const { data, updateData: updateFireStore } = useFireStore(id)
  const { setNotifications, notificationsEnabled, isSupported } = useNotification(id)
  const { docs, updateData: updateAttendanceData } = useGetAttendance(date);

  useProcessActions(id, date)

  return (
    <div className="App">
      <h1>Shul App { date }
      </h1>
      
      <div>{isSupported && <label>
        <input
          type={"checkbox"}
          checked={notificationsEnabled}
          onChange={({ target }) => { setNotifications(target?.checked) }}
        /> Enable Notification
      </label>}</div>
      <div><FireBaseTextBox field="Name" placeholder="Name" UID={id} /></div>
      <div><FireBaseTextBox field="Email" placeholder="Email" type='Email' UID={id} /></div>

      <div><label> <FireBaseCheckbox field="Mincha" UID={id} date={date} /> I Will Be At Shacharit</label></div>
      <div><label> <FireBaseCheckbox field="Maariv" UID={id} date={date} />I Will Be At Maariv</label></div>

      
      <div>Yes: {docs?.length || 0}</div>
    </div>
  );
}

export default App;
