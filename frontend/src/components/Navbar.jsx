import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getTotalCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("authToken");
    setToken("");
    setCartItems({});
  };

  const navItems = [
    {
      path: "/",
      element: "Home",
    },
    {
      path: "/collection",
      element: "Collection",
    },
    {
      path: "/about",
      element: "About",
    },
    { path: "/contact", element: "Contact" },
  ];
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navItems.map(({ path, element }) => {
          return (
            <NavLink to={path} key={element}>
              <p className="uppercase">{element}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          );
        })}
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className=" w-5 cursor-pointer"
          />
          {/* Dropdown */}
        {token &&  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2  w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
              <p
                onClick={() => logOut()}
                className="cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </div>
          </div>}
        </div>

        {/* DropDown Menu User Icon */}
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] text-xs  bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-8px]">
            {getTotalCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:block md:hidden"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Side Bar */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>

          {navItems.map(({ path, element }) => {
            return (
              <NavLink
                to={path}
                key={element}
                onClick={() => setVisible(false)}
              >
                <p className="uppercase py-2 pl-6 border">{element}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
