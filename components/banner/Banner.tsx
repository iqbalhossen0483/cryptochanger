import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { firebase } from "../../services/firebase";
type Slider = { id: string; header: string; slag: string; img: string };

const Banner = () => {
  const [showItem, setShowItem] = useState(0);
  const [sliders, setSliders] = useState<Slider[] | null>(null);
  const { db } = firebase();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "sliders"),
      (snapShot) => {
        let list: any[] = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setSliders(list);
      },
      (error) => {
        alert(error);
      }
    );

    const timer = setInterval(() => {
      setShowItem((prev) => {
        if (prev < sliders.length - 1) return prev + 1;
        else return 0;
      });
    }, 7000);

    return () => {
      clearInterval(timer);
      unsub();
    };
  }, [sliders?.length, db]);

  return (
    <div className='banner-container'>
      {sliders &&
        sliders.map((item, i) => (
          <div className={showItem === i ? "item" : "hidden"} key={i}>
            <div className='slider-text'>
              <div>
                <h3>{item.header}</h3>
                <p>{item.slag}</p>
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
