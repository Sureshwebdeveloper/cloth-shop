import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmail = await userModel.findOne({ email }).select("password");

    if (!userEmail) {
      return res.json({ success: false, message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, userEmail.password);

    if (isMatch) {
      const token = createToken(userEmail._id);

      res.status(200).json({
        success: true,
        message: "Welcome Back",
        token,
      });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkUserExists = await userModel.findOne({ email });

    if (checkUserExists) {
      return res.json({
        success: false,
        message: "Email Address Already Exsits",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter Valid Email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await userData.save();
    const token = createToken(newUser._id);

    return res
      .status(200)
      .json({ success: true, message: "account Created Successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({success:true,message:"Welcome admin",token})
    }else{
      res.json({success:false,message:"Invalid credentials"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });    
  }
};

export { loginUser, registerUser, adminLogin };
