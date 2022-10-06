import { useRouter } from "next/router";
import React, { useState } from "react";

const SideMenu = () => {
  const [active, setActive] = useState<null | number>(null);
  const router = useRouter();

  function handleMenus(menu: string, index: number) {
    setActive(index);
    router.push(router.pathname + "?" + menu.toLowerCase());
  }

  const menus = [
    { name: "Icons", icon: "fa-solid fa-icons" },
    { name: "Slider", icon: "fa-solid fa-sliders" },
    { name: "Exchange", icon: "fa-solid fa-rotate" },
    { name: "Affiliate", icon: "fa-brands fa-affiliatetheme" },
    { name: "Reviews", icon: "fa-solid fa-star" },
    { name: "Pages", icon: "fa-solid fa-ticket" },
  ];

  return (
    <div className='deshboard-menus-wrapper'>
      <div className='deshboard-menus'>
        <h3
          onClick={() => {
            router.push("/deshboard");
            setActive(null);
          }}
        >
          Customization
        </h3>
        {menus.map((item, i) => (
          <button
            onClick={() => handleMenus(item.name, i)}
            className={`item ${
              active === i ? "border-[#008B8B] border-l-2 text-[#008B8B]" : ""
            }`}
            key={item.name}
          >
            <i className={item.icon} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
