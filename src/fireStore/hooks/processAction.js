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
    const currentTime = moment(new Date).format('YYYY-MM-DD HH:mm:ss')

    setValue({ lastLogin: currentTime })

    if (action) {
      const itemToPush = { [dateToUse]: { [minyan]: { value: action, currentTime, method: "URL" } } };
      setValue(itemToPush, true).then(() => {
        window.location.search = stringifyQueryString(rest)
      });
    }
  }, []);
};
