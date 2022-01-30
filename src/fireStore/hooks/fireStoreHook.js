import { useEffect, useState } from "react";
import { getFirestore, collection, doc, setDoc, onSnapshot } from "firebase/firestore";

import { fireBase } from "../../fireBase";
import { getId } from "../../utils/getId";

export const useFireStore = (UID) => {
  const [debounce, setDebounce] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  const fireStore = getFirestore(fireBase);
  const coll = collection(fireStore, "shul");
  const docRef = doc(coll, UID);

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setData(doc.data());
      setIsLoading(false)
    });
  }, []);

  const setValue = (incomingData) => {
    return setDoc(docRef, incomingData, { merge: true });
  }

  const isAdmin = data?.adminIds?.includes(getId())

  return { data, setValue, isLoading, isAdmin };
};
