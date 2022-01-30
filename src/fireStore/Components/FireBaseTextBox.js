import { useContext } from "react";

import { AppContext } from '../../contexts/appContext/appContext'

export const FireBaseTextBox = ({ field, placeholder, type = "text" }) => {
  const { user: { setValue, data } } = useContext(AppContext);

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
      value={val}
      onChange={onChange}
    />
  )
};
