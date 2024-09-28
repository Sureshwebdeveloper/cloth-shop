import React from "react";
import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter.jsx";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full max-w-[450px]" alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="">
          Welcome to <b>FOREVER!</b> We are a dedicated team passionate about providing the latest fashion trends for women, men, and kids. 
          </p>
          <p className="">
          Our mission is to offer high-quality, stylish clothing that makes you feel confident and comfortable. We believe in celebrating individuality and helping you express your unique style.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
         <b> Empowering Your Style: </b> Our mission is to empower individuals through fashion. We strive to provide a diverse range of clothing that caters to all styles and preferences, ensuring everyone can find something they love. We are committed to sustainability and ethical practices, ensuring our products are made with care for both people and the planet.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600"> We maintain strict quality control measures to ensure every item meets our high standards. From sourcing materials to final production, we conduct thorough inspections to guarantee you receive the best products. Our goal is to minimize returns and maximize your satisfaction.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">Shop Anytime, Anywhere: Enjoy the convenience of shopping from the comfort of your home. Our user-friendly website and mobile app make it easy to browse, select, and purchase your favorite items. We offer multiple payment options and fast, reliable shipping to ensure a seamless shopping experience.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Our customer service team is available 24/7 to assist you with any questions or concerns. We pride ourselves on providing prompt, friendly, and helpful support. Whether you need help with sizing, order tracking, or returns, we are here to make your shopping experience as smooth as possible.</p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  );
};

export default About;
