import React, { useContext } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";
import { ShopContext } from "../context/ShopContext";
import Loader from "../components/Loader";
import LoaderHome from "../components/LoaderHome";

const Home = () => {
  const { products } = useContext(ShopContext);
  return (
    <>
       {products.length <=0  ? (
          <LoaderHome />
        ) : (
        <div>
          <Hero />
          <LatestCollection />
          <BestSeller />
          <OurPolicy />
          <NewsLetter />
        </div>
      )}
    </>
  );
};

export default Home;
