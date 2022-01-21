import moment from "moment";
import { useEffect } from "react";

import { useFireStore } from "./fireStoreHook";
import { parseQueryString } from '../../utils/parseQueryString'
import { stringifyQueryString } from '../../utils/stringifyQueryString'


export const useProcessActions = (UID, date) => {
  const { setValue } = useFireStore(UID);


  useEffect(() => {
    const { action, minyan, dateOffset = 0, ...rest } = parseQueryString(window.location);
    const dateToUse = moment(date).add(dateOffset, 'day').format("MMDDYYYY");

    if (action) {
      const itemToPush = { [dateToUse]: { [minyan]: { value: action } } };
      setValue(itemToPush, true).then(() => {
        window.location.search = stringifyQueryString(rest)
      });
    }
  }, []);
};
