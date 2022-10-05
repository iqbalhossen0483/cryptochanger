import React, { createContext, ReactNode } from "react";
import States, { State } from "../States";

export const ContextProvider = createContext<null | State>(null);

const Provider = ({ children }: { children: ReactNode }) => {
  const state: State = States();
  return (
    <ContextProvider.Provider value={state}>
      {children}
    </ContextProvider.Provider>
  );
};

export default Provider;
