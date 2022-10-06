import { useRouter } from "next/router";
import React from "react";
import Affiliate from "../../components/deshboard/Affiliate";
import Exchange from "../../components/deshboard/Exchange";
import Icons from "../../components/deshboard/Icons";
import Pages from "../../components/deshboard/Pages";
import Reviews from "../../components/deshboard/Reviews";
import SideMenu from "../../components/deshboard/SideMenu";
import Slider from "../../components/deshboard/Slider";

const Deshboard = () => {
  const router = useRouter();

  return (
    <div className='deshbaord-container'>
      <SideMenu />
      <section>
        {router.query.icons === "" && <Icons />}
        {router.query.slider === "" && <Slider />}
        {router.query.exchange === "" && <Exchange />}
        {router.query.affiliate === "" && <Affiliate />}
        {router.query.reviews === "" && <Reviews />}
        {router.query.pages === "" && <Pages />}
      </section>
    </div>
  );
};

export default Deshboard;
