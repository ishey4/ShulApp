import moment from "moment";
import { useEffect } from "react";
import { useFireStore } from "./fireStoreHook";

const getQuery = () =>
  window.location.search
    .substring(1)
    .split("&")
    .map((variable) => variable.split("="))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
export const useProcessActions = (UID, date) => {
  const { setValue } = useFireStore(UID);
  const dateToUse = moment(date).format("MMDDYYYY");
  useEffect(() => {
    const { action, minyan } = getQuery();
    if (action) {
      const itemToPush = { [dateToUse]: { [minyan]: action } };
      setValue(itemToPush, true);
    }
  }, []);
};
