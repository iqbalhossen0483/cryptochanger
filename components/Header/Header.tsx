import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useStates from "../../context/hooks/useStates";
import { firebase } from "../../services/firebase";

const Header = () => {
  const router = useRouter();
  const states = useStates();
  const { auth } = firebase();

  async function handleSingOut() {
    try {
      await signOut(auth);
      states.setUser(null);
    } catch (error) {
      alert("Something went wrong!");
    }
  }
  function handleExchange() {
    if (router.pathname !== "/") {
      router.push("/");
    } else {
    }
  }

  const menus = [
    { name: "Affiliate", icon: "fa-solid fa-bullhorn" },
    { name: "Reviews", icon: "fa-solid fa-star" },
    { name: "Contact", icon: "fa-solid fa-phone" },
    { name: "Login", icon: "fa-solid fa-lock" },
    { name: "Create Account", icon: "fa-solid fa-user-plus" },
  ];

  return (
    <header>
      <div className='logo' onClick={() => router.push("/")}>
        {states.logo && (
          <Image width={200} height={32} src={states.logo} alt='' />
        )}
      </div>
      <nav>
        <button onClick={handleExchange}>
          <i className='fa-solid fa-rotate text-xs'></i>
          <span>Exchange</span>
        </button>
        {menus.slice(0, states.user ? 3 : 5).map((Item, i) => (
          <Link key={i} href={Item.name.replace(" ", "-").toLowerCase()}>
            <button>
              <i className={Item.icon + " text-xs"}></i>
              <span>{Item.name}</span>
            </button>
          </Link>
        ))}
        {states.user && (
          <button onClick={handleSingOut}>
            <i className='fa-solid fa-right-from-bracket text-xs'></i>
            <span>LogOut</span>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
