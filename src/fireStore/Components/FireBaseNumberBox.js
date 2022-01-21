import { useFireStore } from "../hooks/fireStoreHook";

export const FireBaseNumberBox = ({ field, UID, placeholder, type = "number" }) => {
  const { setValue, data } = useFireStore(UID);

  const val = data?.[field];

  const _setValue = (val) => {
    const newVal = { [field]: val };
    setValue(newVal);
  };

  const onChange = ({ target }) => _setValue(target?.value)

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={val || 1}
      onChange={onChange}
      min={1}
    />
  )
};
