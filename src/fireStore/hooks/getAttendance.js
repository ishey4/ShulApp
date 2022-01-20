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
  const [people, setPeople] = useState([])
  const [attendance, setAttendance] = useState(0)

  const updateData = async () => {
    const q = query(coll, where(`${date}.${prayer}.value`, "==", value));
    onSnapshot(q, ({ docs }) => setDocs(docs));
  };

  const calculateAttendance = (docs) => docs.reduce((acc, doc) => {
    const { Count = 1 } = doc?.[date]?.[prayer] || {}
    return acc + (Count || 1)
  }, 0)

  useEffect(updateData, []);

  useEffect(async () => {
    const promiseArray = docs.map((doc) => doc.data())
    const docArray = await Promise.all(promiseArray)
    setPeople(docArray)
    setAttendance(calculateAttendance(docArray))
  }, [docs])

  return { docs, people, attendance };
};
