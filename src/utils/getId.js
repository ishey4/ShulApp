import { uuidv4 } from "./uuidv4";

export const getId = () => {
  const id = window.localStorage.getItem("id") || uuidv4();
  localStorage.setItem("id", id);
  return id;
};
