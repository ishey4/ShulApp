import { FireStoreButton } from "../fireStore/Components/Button.js";
import { getId } from "../utils/getId";
import { dateToFormattedDate } from '../utils/dateToFormattedDate'

export const Group = (props) => {
  const id = getId();
  const { prayer, date } = props;
  const dateToDisplay = dateToFormattedDate(date)

  return (
    <div className="group">
      <div className="text">
        {prayer} ({dateToDisplay})
      </div>
      <div className="buttons">
        <FireStoreButton {...{ ...props, value: "Yes", id }} />
        <FireStoreButton {...{ ...props, value: "No", id }} />
        <FireStoreButton {...{ ...props, value: "Maybe", id }} />
      </div>
    </div>
  );
};
