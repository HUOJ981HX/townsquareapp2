'use client'

import React, { createContext, useContext, useState } from "react";
  
const GlobalContext = createContext<any | undefined>(undefined);

export const GlobalProvider = ({ children }: any) => {

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <GlobalContext.Provider value={{  openFilter, setOpenFilter }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
