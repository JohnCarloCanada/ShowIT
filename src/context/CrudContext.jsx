import { createContext, useContext, useEffect, useState } from "react";

const CrudContext = createContext(null);

const CrudProvider = ({ children }) => {
  return <CrudContext.Provider value={{}}>{children}</CrudContext.Provider>;
};

const useCrud = () => {
  const context = useContext(CrudContext);

  return context;
};

export { useCrud, CrudProvider };
