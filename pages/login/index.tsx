import LoginRegistation from "../../components/loginRgistation/LoginRegistation";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import useStates from "../../context/hooks/useStates";
import { firebase } from "../../services/firebase";

const Login = () => {
  const states = useStates();
  const { auth } = firebase();
  async function handleLogin(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      states.setUser(user);
      console.log(user);
      return { error: null, success: true };
    } catch (error: any) {
      return { error: error.message, success: true };
    }
  }
  return (
    <div>
      <LoginRegistation title='Login' action={handleLogin} />
    </div>
  );
};

export default Login;
