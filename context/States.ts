import { onAuthStateChanged, User } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { firebase } from "../services/firebase";

export interface State {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

function States() {
  const [user, setUser] = useState<User>(null);
  const { auth } = firebase();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unSubscribe();
    };
  }, [auth]);
  return {
    user,
    setUser,
  };
}

export default States;
