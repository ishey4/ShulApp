import { useState } from 'react'
import { getFirestore, collection, getDoc, doc, query, where, getDocs } from 'firebase/firestore'
import { fireBase } from '../fireBase'
import { useEffect } from 'react/cjs/react.development';

export const useGetAttendance = () => {
    const fireStore = getFirestore(fireBase);
    const coll = collection(fireStore, 'shul');

    const [docs,setDocs] = useState([])

    const updateData = () => { 
        getDocs(q).then(({ docs }) => {
            setDocs(docs)
        })
    }

    const q = query(coll, where('test.Maariv', '==', true))
    useEffect(updateData,[])

    return { docs, updateData }


    

    window.query = query
    window.where=where
    window.col = coll
    window.getDocs = getDocs
    window.getDoc = getDoc
 }