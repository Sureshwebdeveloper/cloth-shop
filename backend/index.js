import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || "8000";
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());


app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
  res.send("api Working");
});

app.listen(PORT, () => {
  console.log(`Your App Is Successfully Running On http://localhost:${PORT}`);
});
