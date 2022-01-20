import moment from "moment";
import { useEffect } from "react";

import { useFireStore } from "./fireStoreHook";
import { parseQueryString } from '../../utils/parseQueryString'
import { stringifyQueryString } from '../../utils/stringifyQueryString'


export const useProcessActions = (UID, date) => {
  const { setValue } = useFireStore(UID);
  const dateToUse = moment(date).format("MMDDYYYY");

  useEffect(() => {
    const { action, minyan, date = dateToUse, ...rest } = parseQueryString(window.location);

    if (action) {
      const itemToPush = { [date]: { [minyan]: { value: action } } };
      setValue(itemToPush, true).then(() => {
        window.location.search = stringifyQueryString(rest)
      });
    }
  }, []);
};
