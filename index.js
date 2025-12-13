import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
//importing external modules
import cors from "cors";
import logger from "morgan";
import path from "path"

dotenv.config();
const app = express();

//mongoDB connection

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("dbconnection error", err));
//create listening port

//create cors options;
const corsOptions = {
  origin: process.env.ORIGIN || "https://stockmanagement-f.vercel.app",
};

//app level middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));


const PORT = 1234;
app.listen(PORT || 1234, () =>
  console.log(`Server is runnin on port ${process.env.PORT}`)
);




//multer setup
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//import common routes files
import purchaseRouter from "./Routes/User/purchase.routes.js";
import salesRouter from "./Routes/User/sales.route.js";
import paymentRouter from "./Routes/User/payments.route.js";
import wareHouseRouter from "./Routes/User/warehouse.route.js";
import loginRouter from "./Routes/CommonRoutes/login.route.js";

//import admin routes
import registerRouter from "./Routes/AdminRoutes/register.route.js";
import customerRouter from "./Routes/AdminRoutes/customer.route.js";
import suppLierRouter from "./Routes/AdminRoutes/supplier.route.js";
import dealerRouter from "./Routes/AdminRoutes/dealer.route.js";
import companyRouter from "./Routes/AdminRoutes/company.route.js";
import categoryRouter from "./Routes/AdminRoutes/category.route.js";
import productRouter from "./Routes/AdminRoutes/product.route.js";
import currencyRouter from "./Routes/AdminRoutes/currency.route.js";
import stockRouter from "./Routes/AdminRoutes/stock.route.js";
import brandingRouter from "./Routes/AdminRoutes/branding.route.js";

//user routes
app.use("/api/purchase", purchaseRouter);
app.use("/api/sale", salesRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/warehouse", wareHouseRouter);

//admin routes
app.use("/api/user", registerRouter);
app.use("/api/customer", customerRouter);
app.use("/api/company", companyRouter);
app.use("/api/product", productRouter);
app.use("/api/supplier", suppLierRouter);
app.use("/api/dealer", dealerRouter);
app.use("/api/currency", currencyRouter);
app.use("/api/stock", stockRouter);
app.use("/api/auth", loginRouter);
app.use("/api/branding", brandingRouter);
app.use("/api/category", categoryRouter);
