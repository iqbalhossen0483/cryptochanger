import React from "react";
import services from "../../services/services";

const ExchangeNotice = () => {
  return (
    <div className='exchange-notice-container'>
      <div className='exchange-rate-wrapper'>
        <h3>আজকের ক্রয়-বিক্রয় মূল্য</h3>
        <table>
          <thead>
            <tr>
              <th>Gateways</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {services.gateways.map((item) => (
              <tr key={item.id} className='item'>
                <td>{item.name}</td>
                <td className='text-[#0d6363]'>{item.buyRate} TK</td>
                <td className='text-[#0d6363]'>{item.sellRate} TK</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='reserve-wrapper'>
        <h3>Our Reserve</h3>
        {services.gateways.map((item) => (
          <div key={item.id} className='item'>
            <p>{item.name}</p>
            <p>
              {item.reserve} {item.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeNotice;
