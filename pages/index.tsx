import React from "react";
import Banner from "../components/banner/Banner";
import Exchange from "../components/Exchange/Exchange";
import ExchangeNotice from "../components/ExchangeNotice/ExchangeNotice";
import Reviews from "../components/Reviews/Reviews";
import LatestExchange from "../components/LatestExchange/LatestExchange";
import Footer from "../components/Footer/Footer";

const index = () => {
  return (
    <div>
      <Banner />
      <Exchange />
      <ExchangeNotice />
      <Reviews />
      <LatestExchange />
      <Footer />
    </div>
  );
};

export default index;
