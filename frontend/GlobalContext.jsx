import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVar, setGlobalVar] = useState("initialValue");

  const [isAdmin, setIsAdmin] = useState(true);

  const [username, setUsername] = useState("Rickie Au");
  const [profileImage, setProfileImage] = useState("");


  return (
    <GlobalContext.Provider
      value={{
        globalVar,
        setGlobalVar,
        isAdmin,
        setIsAdmin,
        username,
        setUsername,
        profileImage,
        setProfileImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
