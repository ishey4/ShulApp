export const stringifyQueryString = (obj) => Object.entries(obj).reduce((acc, entry) => [...acc, entry.join('=')], []).join('&')