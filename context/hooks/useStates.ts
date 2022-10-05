import { useContext } from "react";
import { ContextProvider } from "../provider/Provider";

const useStates = () => {
  return useContext(ContextProvider);
};

export default useStates;
