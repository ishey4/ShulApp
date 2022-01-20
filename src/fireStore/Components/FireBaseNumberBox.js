import { useFireStore } from "../hooks/fireStoreHook";

export const FireBaseNumberBox = ({ field, UID, placeholder, type = "number" }) => {
  const { setValue, data } = useFireStore(UID);

  const val = data?.[field];

  const _setValue = (val) => {
    const newVal = { [field]: val };
    setValue(newVal);
  };

  const onChange = ({ target }) => {
    console.log(target?.checked);
    _setValue(target?.value);
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={val || 0}
      onChange={onChange}
      min={1}
    />
  )
};
