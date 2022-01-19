import moment from "moment";
import { useEffect } from "react";

import { useFireStore } from "./fireStoreHook";
import { parseQueryString } from '../../utils/parseQueryString'


export const useProcessActions = (UID, date) => {
  const { setValue } = useFireStore(UID);
  const dateToUse = moment(date).format("MMDDYYYY");

  useEffect(() => {
    const { action, minyan } = parseQueryString(window.location);
    if (action) {
      const itemToPush = { [dateToUse]: { [minyan]: action } };
      setValue(itemToPush, true).then(() =>
        window.location.search = '');
    }
  }, []);
};
