import dotenv from "dotenv";

dotenv.config();

//mongoDB connection
import mongoose from "mongoose";
mongoose
  .connect(process.env.DB_URl)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("dbconnection error", err));
//create listening port
import express from "express";
const app = express();

const PORT = 1234;
app.listen(PORT || 1234, () =>
  console.log(`Server is runnin on port ${process.env.PORT}`)
);

//importing external modules
import cors from "cors";
import logger from "morgan";
//create cors options;

const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  process.env.ORIGIN // deployed frontend on Vercel
];

const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin (Postman/curl)
    if (!origin) return callback(null, true);

    if (!allowedOrigins.includes(origin)) {
      console.log("Blocked CORS request from origin:", origin);
      return callback(new Error(`CORS policy does not allow access from ${origin}`), false);
    }

    return callback(null, true);
  },
  credentials: true // if using cookies/auth headers
}

//app level middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

//import common routes files
import purchaseRouter from "./Routes/User/purchase.routes.js";
import salesRouter from "./Routes/User/sales.route.js";
import loginRouter from "./Routes/CommonRoutes/login.route.js";

//import admin routes
import registerRouter from "./Routes/AdminRoutes/register.route.js";
import customerRouter from "./Routes/AdminRoutes/customer.route.js";
import suppLierRouter from "./Routes/AdminRoutes/supplier.route.js";
import dealerRouter from "./Routes/AdminRoutes/dealer.route.js";
import companyRouter from "./Routes/AdminRoutes/company.route.js";
import productRouter from "./Routes/AdminRoutes/product.route.js";
import currencyRouter from "./Routes/AdminRoutes/currency.route.js";
import stockRouter from "./Routes/AdminRoutes/stock.route.js";
import brandingRouter from "./Routes/AdminRoutes/branding.route.js";

//user routes
app.use("/api/purchase", purchaseRouter);
app.use("/api/sale", salesRouter);

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
