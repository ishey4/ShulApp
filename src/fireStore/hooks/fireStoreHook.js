import { useEffect, useState } from "react";
import { getFirestore, collection, doc, setDoc, onSnapshot } from "firebase/firestore";

import { fireBase } from "../../fireBase";

export const useFireStore = (UID) => {
  const [debounce, setDebounce] = useState();
  const [data, setData] = useState({});

  const fireStore = getFirestore(fireBase);
  const coll = collection(fireStore, "shul");
  const docRef = doc(coll, UID);

  const updateData = async () => {
    onSnapshot(docRef, (doc) => {
      setData(doc.data());
    });
  };

  useEffect(updateData, []);

  const setValue = (data, sendImmediately = false) => {

    if (!sendImmediately) {
      clearTimeout(debounce);
      const deb = setTimeout(() => {
        setDoc(docRef, data, { merge: true });
      }, 300);

      setDebounce(deb);
      setData(data);

    } else {
      return setDoc(docRef, data, { merge: true });
    }
  };

  return { data, setValue, updateData };
};
