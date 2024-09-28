import React from "react";

const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center mx-auto h-[50vh] py-28">
        <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#453f3f] border-t-[#c268bc] duration-[1] animate-spin"></div>
      </div>
    </>
  );
};

export default Loader;
