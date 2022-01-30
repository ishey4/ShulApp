import { useContext } from "react";
import moment from "moment";

import { AppContext } from '../../contexts/appContext/appContext'
import { useGetAttendance } from "../hooks/getAttendance";
import { PhoneLink } from './Phone'


export const FireStoreButton = ({ prayer, date, value, count }) => {
  const { user: { setValue, data } } = useContext(AppContext);

  const currentTime = moment(new Date).format('YYYY-MM-DD HH:mm:ss')

  const { people, attendance } = useGetAttendance(date, prayer, value);

  const { showNames } = data || {}
  const { Count, value: myValue } = data?.[date]?.[prayer] || {}
  const myAttendance = Count || 1

  const countAsNumber = parseInt(count, 10) || 0
  const isSelected = value === myValue
  const displayAttendance = !isSelected ? attendance : attendance - myAttendance


  const onClick = () => setValue({ [date]: { [prayer]: { value, Count: countAsNumber, currentTime, method: "Click" } } });
  const className = data?.[date]?.[prayer]?.value === value ? "selected" : "";

  return (<div className="buttonWrapper">
    <button onClick={onClick} className={className}>
      {value} ({displayAttendance}) {isSelected && `+ ${myAttendance || 1}` || ''}
    </button>

    {showNames && <div className="peopleList">
      {people.map(({ Name, Phone, ...rest }) => <PhoneLink phoneNumber={Phone}>{Name} ({rest?.[date]?.[prayer]?.Count || 1})</PhoneLink>)}
    </div>}
  </div>
  );
};
