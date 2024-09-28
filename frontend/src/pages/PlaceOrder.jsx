import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    products,
    cartItems,
    setCartItems,
    navigate,
    backend_url,
    delivery_fee,
    token,
    getTotalCartAmount,
    loading,
    setLoading,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const razorpayPaymentResponse = await axios.post(
            `${backend_url}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          );

          if (razorpayPaymentResponse.data.success) {
            navigate("/orders");
            setCartItems({});
            toast.success(razorpayPaymentResponse.data.message);
            console.log("handler", razorpayPaymentResponse.data.success);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            // structuredClone ---> deepclone
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: Number(getTotalCartAmount() + delivery_fee),
      };

      setLoading(true);
      switch (method) {
        // Api call Cash on deliver
        case "cod":
          const response = await axios.post(
            `${backend_url}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            setLoading(false);
            navigate("/orders");
            toast.success(response.data.message)
          } else {
            setLoading(false);
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            `${backend_url}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          setLoading(true);
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
            setLoading(false);
          } else {
            toast.error(responseStripe.data.message);
            setLoading(false);
          }
          break;

        case "razorpay":
          const responseRazorPay = await axios.post(
            `${backend_url}/api/order/razorpay`,
            orderData,
            { headers: { token } }
          );
          setLoading(true)
          if (responseRazorPay.data.success) {
            setLoading(false)
            initPay(responseRazorPay.data.order);
          }
        default:
          break;
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={(event) => onSubmitHandler(event)}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* --------Text Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[460px]">
        <div className="text-xl sm:text-2xl my-5">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            placeholder="First name"
            className="border border-gray-300 rounded px-3 py-1.5 w-full"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            placeholder="Last name"
            className="border border-gray-300 rounded px-3 py-1.5 w-full"
          />
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          placeholder="Email address"
          className="border border-gray-300 rounded px-3 py-1.5 w-full"
        />
        <input
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          placeholder="Street"
          className="border border-gray-300 rounded px-3 py-1.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            placeholder="City"
            className="border border-gray-300 rounded px-3 py-1.5 w-full"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            placeholder="State"
            className="border border-gray-300 rounded px-3 py-1.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            placeholder="Zip Code"
            className="border border-gray-300 rounded px-3 py-1.5 w-full"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            placeholder="Country"
            className="border border-gray-300 rounded px-3 py-1.5 w-full"
          />
        </div>
        <input
          type="number"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          placeholder="phone"
          className="border border-gray-300 rounded px-3 py-1.5 w-full"
        />
      </div>

      {/* ------Right Side------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Text Payment Method Selcetion*/}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
             {loading ? "Loading ..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
