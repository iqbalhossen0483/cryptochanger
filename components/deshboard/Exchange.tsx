import Image from "next/image";
import React from "react";
import services from "../../services/services";

const Exchange = () => {
  // try {
  //   await addDoc(collection(db, "sliders"), slider[index]);
  //   alert("Your changes successfully saved");
  // } catch (e) {
  //   alert("Opp!, There was an error occured");
  // }
  return (
    <div className='deshboard-exchange-container'>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Sell Rate</th>
            <th>Buy Rate</th>
            <th>Reserve</th>
          </tr>
        </thead>
        <tbody>
          {services.gateways.map((item) => (
            <tr key={item.id}>
              <td>
                <Image width={50} height={50} src={item.img} alt='' />
              </td>
              <td>
                <span className='font-semibold'>{item.name}</span>
              </td>
              <td>
                <span className='font-semibold'>{item.sellRate}</span>
              </td>
              <td>
                <span className='font-semibold'>{item.buyRate}</span>
              </td>
              <td>
                <span
                  className={`font-semibold ${
                    item.reserve < 500 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {item.reserve}
                </span>
              </td>
              <td className='space-x-2'>
                <button>
                  <i className='fa-solid fa-pen-to-square' />
                </button>
                <button>
                  <i className='fa-solid fa-trash' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exchange;
