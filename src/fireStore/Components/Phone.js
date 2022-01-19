import { parseQueryString } from "../../utils/parseQueryString"

export const PhoneLink = ({ phoneNumber, children }) => {
  const showNames = parseQueryString(window.location)?.showNames

  return showNames ?
    phoneNumber ? <a href={`tel:${phoneNumber}`}> {children} </a> : <div>{children}</div>
    : null
}