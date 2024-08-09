import express from "express";
import mongoose from "mongoose";
import router from "./routes/stuff.js";
import userRouter from "./routes/users.js";
import path from "path"
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/objets_market")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/stuff",router)
app.use("/api/auth",userRouter)
app.use("/images", express.static(path.join(path.dirname(import.meta.url), "images")));


export default app;
