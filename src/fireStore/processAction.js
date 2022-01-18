import { useEffect } from "react";
import { useFireStore } from './fireStoreHook'

const broadcast = new BroadcastChannel('channel-123');



export const useProcessActions = (UID, date) => { 
    const { setValue } = useFireStore(UID);

    useEffect(() => { 
        broadcast.onmessage = (event) => {
            const { data: { action, payload: { minyan } } } = event;
            const itemToPush = { [date]: { [minyan]: action === 'PUSH_YES' } };
            setValue(itemToPush)
        console.log("In component", { event })
        }
    },[])
}
