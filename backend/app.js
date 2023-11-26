import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routers/userRoutes.js";
import authProvider from "./authProvider.js";
import jwt from "jsonwebtoken";

const app = express();
export const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};
dotenv.config();
app.listen(process.env.PORT);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use("/auth", authProvider);

app.use("/user", userRoutes);
