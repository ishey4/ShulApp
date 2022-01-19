import { useFireStore } from "../hooks/fireStoreHook";
import { useGetAttendance } from "../hooks/getAttendance";
import { PhoneLink } from './Phone'

export const FireStoreButton = ({ prayer, date, value, id }) => {

  const { setValue, data } = useFireStore(id);
  const { docs, people } = useGetAttendance(date, prayer, value);

  const onClick = () => setValue({ [date]: { [prayer]: value } });
  const className = data?.[date]?.[prayer] === value ? "selected" : "";

  window.docs = docs

  return (<div className="buttonWrapper">
    <button onClick={onClick} className={className}>
      {value} ({docs?.length || 0})
    </button>
    <div className="peopleList">
      {people.map(({ Name, Phone }) => <PhoneLink phoneNumber={Phone}>{Name}</PhoneLink>)}
    </div>
  </div>
  );
};
