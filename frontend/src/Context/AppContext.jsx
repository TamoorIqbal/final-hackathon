import React, { createContext, useState } from "react";
const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
