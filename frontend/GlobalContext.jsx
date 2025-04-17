import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAdminGlobal, setIsAdminGlobal] = useState(false);
  const [ageGlobal, setAgeGlobal] = useState("");
  const [genderGlobal, setGenderGlobal] = useState("");
  const [profilePictureGlobal, setProfilePictureGlobal] = useState("");


  const [usernameGlobal, setUsernameGlobal] = useState("");
  const [phoneGlobal, setPhoneGlobal] = useState("");

  const [idGlobal, setIdGlobal] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        isAdminGlobal,
        setIsAdminGlobal,
        usernameGlobal,
        setUsernameGlobal,
        phoneGlobal,
        setPhoneGlobal,
        ageGlobal,
        setAgeGlobal,
        genderGlobal,
        setGenderGlobal,
        profilePictureGlobal,
        setProfilePictureGlobal,
        idGlobal,
        setIdGlobal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
