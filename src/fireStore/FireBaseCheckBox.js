import { useFireStore } from "./fireStoreHook"

export const FireBaseCheckbox = ({ field, UID, date }) => {
    const { setValue, data } = useFireStore(UID)

    const val = data?.[date]?.[field]
   
    const _setValue = (val) => {
        const newVal = { [date]: { [field]: val } };
        setValue(newVal)
     }

    return <input type="checkbox" checked={val} onChange={({ target }) => { console.log(target?.checked); _setValue(target?.checked) }} />
    
 }