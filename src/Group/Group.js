import { useContext } from "react";

import { AppContext } from "../contexts/appContext/appContext";
import { FireStoreButton } from "../fireStore/Components/Button";
import { dateToFormattedDate } from '../utils/dateToFormattedDate'

const buttonValues = ['Yes', 'No', 'Maybe']

export const Group = (props) => {
  const { prayer, date } = props;
  const dateToDisplay = dateToFormattedDate(date)

  const { user: { data: { Count = 0 } = {} } } = useContext(AppContext)

  return (
    <div className="group">
      <div className="text">
        {prayer} ({dateToDisplay})
      </div>
      <div className="buttons">
        {buttonValues.map((value) => <FireStoreButton {...{ ...props, value, count: Count }} />)}
      </div>
    </div>
  );
};
