import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { fireBase } from "../../fireBase";

export const useGetAttendance = (date, prayer, value) => {
  const fireStore = getFirestore(fireBase);
  const coll = collection(fireStore, "shul");

  const [docs, setDocs] = useState([]);

  const updateData = async () => {
    const q = query(coll, where(`${date}.${prayer}`, "==", value));
    onSnapshot(q, ({ docs }) => setDocs(docs));
  };

  useEffect(updateData, []);

  return { docs };
};
