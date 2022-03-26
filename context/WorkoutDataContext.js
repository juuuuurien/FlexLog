import React, {createContext, useState} from 'react'

export const WorkoutDataContext = createContext();

export const WorkoutDataContextProvider = ({children, value})=> {

  return (
    <WorkoutDataContext.Provider value={value}>{children}</WorkoutDataContext.Provider>
  )
}