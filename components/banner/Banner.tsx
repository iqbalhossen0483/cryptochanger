import Image from "next/image";
import React, { useEffect, useState } from "react";

const Banner = () => {
  const [showItem, setShowItem] = useState(0);

  const sliders = [
    {
      heading: "Slider-1",
      text: "Exchange your money with us safly and securely",
      img: "/img-1.jfif",
    },
    {
      heading: "Slider-2",
      text: "We have lots of option to exchange your money",
      img: "/img-2.jfif",
    },
    {
      heading: "Slider-3",
      text: "Money is power, But one country's money has no value in another country",
      img: "/img-3.jpg",
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setShowItem((prev) => {
        if (prev < sliders.length - 1) return prev + 1;
        else return 0;
      });
    }, 7000);

    return () => {
      clearInterval(timer);
    };
  }, [sliders.length]);

  return (
    <div className='banner-container'>
      {sliders.map((item, i) => (
        <div className={showItem === i ? "item" : "hidden"} key={i}>
          <div className='slider-text'>
            <div>
              <h3>{item.heading}</h3>
              <p>{item.text}</p>
            </div>
          </div>
          <div className='slider-img'>
            <Image width={450} height={250} src={item.img} alt='' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
