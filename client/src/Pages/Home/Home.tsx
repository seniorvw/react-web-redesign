import React from "react";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import HomePageVideo from "../../Components/HomePageVideo/HomePageVideo";
import FeaturedChannels from "../../Components/FeaturedChannels/FeaturedChannels";
import SavedClips from "../../Components/SavedClips/SavedClips";
import RecentBlogs from "../../Components/RecentBlogs/RecentBlogs";
import ContactUs from "../../Components/ContactUs/ContactUs";
import HomeFooter from "../../Components/HomeFooter/HomeFooter";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <HomePageVideo />
      <FeaturedChannels />
      <SavedClips />
      <RecentBlogs />
      <ContactUs />
      <HomeFooter />
    </div>
  );
};

export default Home;
