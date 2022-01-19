export const parseQueryString = ({ search }) => search
  .substring(1)
  .split("&")
  .map((variable) => variable.split("="))
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});