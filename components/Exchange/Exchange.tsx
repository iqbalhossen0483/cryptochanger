import React, { useState } from "react";
import services from "../../services/services";
import Image from "next/image";

const Exchange = () => {
  const [sendGateway, setSendGateway] = useState({
    amount: 1,
    gateway: services.gateways[0],
  });
  const [receiveGateway, setReceiveGateway] = useState({
    amount: 1.0,
    gateway: services.gateways[0],
  });

  function handleSend(value: string) {
    const gateway = services.gateways.find((way) => way.name === value);
    setSendGateway({ amount: sendGateway.amount, gateway });
    setReceiveGateway((prev) => {
      return { amount: gateway.buyRate, gateway: prev.gateway };
    });
  }

  function handleReceive(value: string) {
    const gateway = services.gateways.find((way) => way.name === value);
    setReceiveGateway({ amount: gateway.sellRate, gateway });
  }

  return (
    <div className='exchange-container'>
      <h3>Exchange instantly - 5 minutes to (30 minutes max)</h3>

      <section>
        <div className='img-wrapper'>
          <Image width={80} height={80} src={sendGateway.gateway.img} alt='' />
        </div>

        <div className='input-wrapper'>
          <p>
            <i className='fa-solid fa-arrow-down'></i> Send
          </p>
          <select onChange={(e) => handleSend(e.target.value)}>
            {services.gateways.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type='number'
            value={sendGateway.amount}
            onChange={(e) =>
              setSendGateway((prev) => {
                return {
                  amount: parseFloat(e.target.value),
                  gateway: prev.gateway,
                };
              })
            }
            placeholder='Enter Amount'
          />
          <small className='text-right block'>
            Exchange rate: 1 {sendGateway.gateway.type} ={" "}
            {sendGateway.gateway.buyRate}
            {receiveGateway.gateway.type}
          </small>
        </div>

        <div className='input-wrapper'>
          <p>
            <i className='fa-solid fa-arrow-up'></i> Receive
          </p>
          <select onChange={(e) => handleReceive(e.target.value)}>
            {services.gateways.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type='number'
            value={receiveGateway.amount}
            onChange={(e) =>
              setReceiveGateway((prev) => {
                return {
                  amount: parseFloat(e.target.value),
                  gateway: prev.gateway,
                };
              })
            }
            placeholder='Enter Amount'
          />
          <small className='block'>
            Reserve: {receiveGateway.gateway.reserve}
            {receiveGateway.gateway.type}
          </small>
        </div>

        <div className='img-wrapper'>
          <Image
            width={80}
            height={80}
            src={receiveGateway.gateway.img}
            alt=''
          />
        </div>
      </section>

      <div className='flex justify-center mt-5'>
        <button>
          <i className='fa-solid fa-rotate'></i> Exchange
        </button>
      </div>
    </div>
  );
};

export default Exchange;
