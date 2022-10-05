import LoginRegistation from "../../components/loginRgistation/LoginRegistation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import useStates from "../../context/hooks/useStates";
import { firebase } from "../../services/firebase";

function CreateAccount() {
  const states = useStates();
  const { auth } = firebase();

  async function handleRegister(
    email: string,
    password: string,
    name?: string
  ) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      states.setUser(res.user);
      console.log(res.user);
      return { error: null, success: true };
    } catch (error: any) {
      return { error: error.message, success: false };
    }
  }

  return (
    <div>
      <LoginRegistation title='Create Account' action={handleRegister} />
    </div>
  );
}

export default CreateAccount;
