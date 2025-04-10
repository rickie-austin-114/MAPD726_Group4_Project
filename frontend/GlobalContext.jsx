import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVar, setGlobalVar] = useState("initialValue");

  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        globalVar,
        setGlobalVar,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
