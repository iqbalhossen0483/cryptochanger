import Image from "next/image";
import React from "react";
import services from "../../services/services";
import Carousel from "react-multi-carousel";
import settings from "../../services/sliderSetting";

const LatestExchange = () => {
  return (
    <div className='latest-exchange-container'>
      <h3>Latest Exchange</h3>
      <Carousel
        responsive={settings}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
        arrows={false}
        className='mx-3'
      >
        {services.latestExchange.map((item) => (
          <div key={item.id} className='latest-exchange-item'>
            <Image width={30} height={30} src={item.from.img} alt='' />
            <p>{item.from.amount}</p>
            <i className='fa-solid fa-circle-arrow-right text-gray-500'></i>
            <Image width={30} height={30} src={item.to.img} alt='' />
            <p>{item.from.amount}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LatestExchange;
