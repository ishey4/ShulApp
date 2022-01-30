import { createContext, useState } from "react";
import { useFireStore } from "../../fireStore/hooks/fireStoreHook";
import { getId } from "../../utils/getId";

export const AppContext = createContext({
  app: {
    data: {},
    setValue: () => { },
    isLoading: true,
    isAdmin: false
  },
  user: {
    data: {},
    setValue: () => { },
    isLoading: true,
    isAdmin: false
  }
})

export const AppContextComponent = ({ children }) => {
  const sharedFireStoreHook = useFireStore(getId())
  const sharedAppHook = useFireStore('appInfo')

  const value = { app: sharedAppHook, user: sharedFireStoreHook }

  const isLoading = sharedAppHook.isLoading || sharedFireStoreHook.isLoading

  return <AppContext.Provider value={value}>
    {!isLoading && children}
    {isLoading && 'Loading...'}
  </AppContext.Provider>
}

