import { useState, useEffect } from 'react'
import { getFirestore, collection, getDoc, doc, query, where, getDocs, onSnapshot } from 'firebase/firestore'
import { fireBase } from '../fireBase'


export const useGetAttendance = (date) => {
    const fireStore = getFirestore(fireBase);
    const coll = collection(fireStore, 'shul');

    const [docs,setDocs] = useState([])

    const updateData = async () => { 
        const q = query(coll, where(`${date}.Maariv`, '==', true));
        onSnapshot(q, ({ docs }) => {
            setDocs(docs)
         })
    }


    useEffect(() => { updateData() }, []);

    return { docs, updateData }
 }