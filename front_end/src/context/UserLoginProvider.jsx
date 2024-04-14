import React, { Children } from "react";
import { createContext, useState } from "react";

export const UserLoginContext = createContext(false);

function UserLoginProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState(false);
  return (
    <UserLoginContext.Provider
      value={{
        userLoggedIn,
        setUserLoggedIn,
        userName,
        setUserName,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
}

export default UserLoginProvider;
