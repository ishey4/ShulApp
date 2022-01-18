import './App.css';

import { useEffect } from 'react';

import { useNotification } from './fireStore/notificationHook';
import { useFireStore } from './fireStore/fireStoreHook';
import { FireBaseCheckbox } from './fireStore/FireBaseCheckBox';
import { FireBaseTextBox } from './fireStore/FireBaseTextBox'
import { useGetAttendance } from './fireStore/getAttendance';


const id = '123456789'
// window.fireStore = firestore
// window.fireBase = fireBase

const App = () => {
  const { data, updateData:updateFireStore } = useFireStore(id)
  const { setNotifications, notificationsEnabled } = useNotification(id)
  const { docs, updateData:updateAttendanceData } = useGetAttendance(id);

  const update = () => { 
    updateFireStore();
    updateAttendanceData()
  }

  return (
    <div className="App">
      <h1>Shul App
        <div><label> <input
        type={"checkbox"}
        checked={notificationsEnabled}
        onChange={({ target }) => { setNotifications(target?.checked) }}
      /> Enable Notification
        </label></div></h1>
      <div><FireBaseTextBox field="Name" placeholder="Name" UID={id} /></div>
      <div><FireBaseTextBox field="Email" placeholder="Email" type='Email' UID={id} /></div>

      <div><label> <FireBaseCheckbox field="Mincha" UID={id} date="test" /> I Will Be At Shacharit</label></div>
      <div><label> <FireBaseCheckbox field="Maariv" UID={id} date="test" />I Will Be At Maariv</label></div>

      
      <div>Yes: {docs?.length || 0}</div>
      <button onClick={update}>update</button>
    </div>
  );
}

export default App;
