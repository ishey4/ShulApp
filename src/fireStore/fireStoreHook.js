import { useEffect, useState } from 'react';

import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore'

import { fireBase } from '../fireBase'

export const useFireStore = (UID) => {
    const fireStore = getFirestore(fireBase);   
    const coll = collection(fireStore, 'shul');
    const docRef = doc(coll,UID)

    const [data, setData] = useState({})

    const updateData = async () => {
        const doc = await getDoc(docRef)
        setData( doc.data())
    }

    useEffect(updateData,[])
            
    const setValue = (data) => { setDoc(docRef, data, { merge: true }); updateData()}
    
    return { data, setValue, updateData };  
 }