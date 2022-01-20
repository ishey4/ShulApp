import { FireStoreButton } from "../fireStore/Components/Button.js";
import { getId } from "../utils/getId";
import { dateToFormattedDate } from '../utils/dateToFormattedDate'
import { useFireStore } from "../fireStore/hooks/fireStoreHook.js";

const buttonValues = ['Yes', 'No', 'Maybe']

export const Group = (props) => {
  const { prayer, date, id } = props;
  const dateToDisplay = dateToFormattedDate(date)

  const { data: { Count = 0 } = {} } = useFireStore(id)

  console.log("data", { Count })

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
