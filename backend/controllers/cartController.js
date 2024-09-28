import userModel from "../models/userModel.js";

// Add product to user Cart
const addToCart = async (req, res) => {
  try {
    // userId Get it from cartAuth Middleware
    // itemId for product id to make action like increase or decrease cart items by user
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ suceess: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ suceess: false, message: error.message });
  }
};

// Update Product
const updateCart = async (req, res) => {
  try {
    // userId Get it from cartAuth Middleware
    const { userId, itemId, size,quantity} = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId,{cartData});
    res.json({success:true, message:"Cart Updated"})

  } catch (error) {
    console.log(error);
    res.json({ suceess: false, message: error.message });
  }
};

// Get A User Cart Data
const getUserCart = async (req, res) => {
  try {
    // userId Get it from cartAuth Middleware
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({success:true, cartData})
  } catch (error) {
    console.log(error);
    res.json({ suceess: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
