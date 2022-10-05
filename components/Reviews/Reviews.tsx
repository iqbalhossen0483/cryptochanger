import React from "react";
import services from "../../services/services";
import Carousel from "react-multi-carousel";
import settings from "../../services/sliderSetting";

const Reviews = () => {
  return (
    <div className='reviews-container'>
      <h3>Reviews</h3>
      <Carousel
        responsive={settings}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
        arrows={false}
        className='mx-3'
      >
        {services.reviews.map((item) => (
          <div className='review-item' key={item.id}>
            <p>
              <span className='text-[#0d6363] font-medium'>{item.name}</span>,{" "}
              {item.date}
            </p>
            <p className='text-justify mt-2'>{item.body}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Reviews;
