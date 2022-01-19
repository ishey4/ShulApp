import { useFireStore } from "../hooks/fireStoreHook";
import { useGetAttendance } from "../hooks/getAttendance";

export const FireStoreButton = ({ prayer, date, value, id }) => {

  const { setValue, data } = useFireStore(id);
  const { docs } = useGetAttendance(date, prayer, value);

  const onClick = () => setValue({ [date]: { [prayer]: value } });
  const className = data?.[date]?.[prayer] === value ? "selected" : "";

  return (
    <button onClick={onClick} className={className}>
      {value} ({docs?.length || 0})
    </button>
  );
};
