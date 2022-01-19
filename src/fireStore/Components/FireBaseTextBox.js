import { useFireStore } from "../hooks/fireStoreHook";

export const FireBaseTextBox = ({ field, UID, placeholder, type = "text" }) => {
  const { setValue, data } = useFireStore(UID);

  const val = data?.[field];

  const _setValue = (val) => {
    const newVal = { [field]: val };
    setValue(newVal);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={val}
      onChange={({ target }) => {
        console.log(target?.checked);
        _setValue(target?.value);
      }}
    />
  );
};
