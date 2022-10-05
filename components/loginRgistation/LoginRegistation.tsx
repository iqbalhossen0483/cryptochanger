import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { firebase } from "../../services/firebase";
import useStates from "../../context/hooks/useStates";

type Props = {
  title: userAction;
  action: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ error: string; success: boolean }>;
};

const LoginRegistation = ({ title, action }: Props) => {
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const { auth, googleProvider } = firebase();
  const states = useStates();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  function handleUser(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    setUser((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title === "Create Account" && user.password !== user.rePassword) {
      return setError("Password is not matched");
    }
    const res = await action(user.email, user.password, user.name);
    if (res.success) {
      setError(null);
      router.push("/");
    } else {
      setError(res.error);
    }
  }

  async function googleLogin() {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      states.setUser(user);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={title === "Login" ? "mt-20" : "mt-7"}
    >
      <h3>
        {title === "Login" ? "Please Login Here" : "Please Create An Account"}
      </h3>
      <div className='font-medium'>
        {title !== "Login" && (
          <input
            type='text'
            name='name'
            required
            value={user.name}
            onChange={(e) => handleUser(e)}
            placeholder='Enter your Name'
          />
        )}
        <input
          type='email'
          name='email'
          required
          value={user.email}
          onChange={(e) => handleUser(e)}
          placeholder='Enter your Email'
        />
        <input
          type='password'
          name='password'
          required
          value={user.password}
          onChange={(e) => handleUser(e)}
          placeholder='Give a password'
        />
        {title !== "Login" && (
          <input
            type='password'
            name='rePassword'
            required
            value={user.rePassword}
            onChange={(e) => handleUser(e)}
            placeholder='Re-enter the password'
          />
        )}
        <div className='mt-2 flex justify-center'>
          <button className='bg-[#008B8B] font-medium' type='submit'>
            <i
              className={
                title === "Login"
                  ? "fa-solid fa-lock-open"
                  : "fa-solid fa-address-card"
              }
            />
            <span>{title}</span>
          </button>
        </div>
        <p className='text-red-400 text-center font-normal'>{error}</p>
      </div>

      <p className='text-xl font-medium'>----------- Or ----------</p>

      <div className='space-x-3 font-medium'>
        <button onClick={googleLogin} className='bg-[#008B8B]' type='button'>
          <i className='fa-brands fa-google'></i>
          <span>Google</span>
        </button>
        <button
          onClick={() => alert("comming soon")}
          className='bg-[#008B8B]'
          type='button'
        >
          <i className='fa-brands fa-facebook'></i>
          <span>Facebook</span>
        </button>
      </div>
    </form>
  );
};

export default LoginRegistation;
