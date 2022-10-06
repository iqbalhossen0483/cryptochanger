import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { firebase } from "../services/firebase";

export interface State {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  logo: string;
  setLogo: Dispatch<SetStateAction<string>>;
  favicon: string;
  setFavicon: Dispatch<SetStateAction<string>>;
}

function States() {
  const [user, setUser] = useState<User>(null);
  const [logo, setLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const { auth, db } = firebase();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const unsub = onSnapshot(
      collection(db, "images"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          if (list.length) {
            setLogo(list[0].logo);
            setFavicon(list[0].favicon);
          }
        });
      },
      (error) => {
        alert(error);
      }
    );

    return () => {
      unSubscribe();
      unsub();
    };
  }, [auth, db]);
  return {
    user,
    setUser,
    logo,
    setLogo,
    favicon,
    setFavicon,
  };
}

export default States;
