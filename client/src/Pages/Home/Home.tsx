import React from "react";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import HomePageVideo from "../../Components/HomePageVideo/HomePageVideo";
import FeaturedChannels from "../../Components/FeaturedChannels/FeaturedChannels";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <HomePageVideo />
      {/* <FeaturedChannels /> */}
    </div>
  );
};

export default Home;
