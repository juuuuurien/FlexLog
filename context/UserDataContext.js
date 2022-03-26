import React, {createContext, useState} from 'react'

export const UserDataContext = createContext();

export const UserDataContextProvider = ({children, value})=> {

  return (
    <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
  )
}