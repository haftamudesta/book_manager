import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  async function signIn(email, password) {}
  async function signUp(email, password) {}
  async function signOut(email, password) {}

  return (
    <UserContext.Provider value={(user, signIn, signUp, signOut)}>
      {children}
    </UserContext.Provider>
  );
};
