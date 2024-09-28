import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backend_url, loading, setLoading } =
    useContext(ShopContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      setLoading(true);
      const response = await axios.post(
        `${backend_url}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        navigate("/orders");
        toast.success(response.data.message);
        setLoading(false);
        setCartItems({});
      } else {
        navigate("/cart");
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <>
      {loading && (
        <>
          <div className="flex items-center justify-center mx-auto h-screen py-28 ">
            <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#e3a1f1] duration-[1] animate-spin"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Verify;
