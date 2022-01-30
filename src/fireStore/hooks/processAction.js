import moment from "moment";
import { useContext, useEffect } from "react";

import { AppContext } from '../../contexts/appContext/appContext'
import { parseQueryString } from '../../utils/parseQueryString'
import { stringifyQueryString } from '../../utils/stringifyQueryString'



export const useProcessActions = (date) => {
  const { user: { setValue } } = useContext(AppContext);

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
