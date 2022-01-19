import { FireStoreButton } from "../fireStore/Components/Button.js";
import { getId } from "../utils/getId";
import { dateToFormattedDate } from '../utils/dateToFormattedDate'

const buttonValues = ['Yes', 'No', 'Maybe']

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
        {buttonValues.map((value) => <FireStoreButton {...{ ...props, value, id }} />)}
      </div>
    </div>
  );
};
