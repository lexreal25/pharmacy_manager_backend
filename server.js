import dotenv from "dotenv";
import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { SessionStore } from "./src/utils/session.store.js";
import { xss } from "express-xss-sanitizer";
import expressSession from "express-session";

import authRoute from "./src/routes/authRoute.js";
import dashBoardRoute from "./src/routes/dashBoardRoute.js";
import salesRoute from "./src/routes/salesRoute.js";
import inventoryRoute from "./src/routes/inventoryRoute.js";
import userRoute from "./src/routes/userRouth.js";
import medicinesRoute from "./src/routes/medicineRoute.js";
import customersRoute from "./src/routes/customersRoute.js";
import suppliersRoute from "./src/routes/suppliersRouter.js";
import { connectDB } from "./src/config/db.js";



dotenv.config();

//Database connection
connectDB();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("short"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

//sanitizes user input data (in req.body, req.query, req.headers and req.params) to prevent Cross Site Scripting (XSS) attack.
app.use(xss());


//session middleware sets cookies to expire after 30mins

app.use(expressSession({
  cookie:{
    maxAge: 30 * 60 * 100 ,//30 mins
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: SessionStore //to be imported from utils/sessionstore
}))


// test routes
// app.get("/", async (req, res) => {
//   const users = await User.findOne({username:"daniel"});
//   res.status(200).json({
//     success: true,
//     message: "Welcome to Pharmacy Management System API",
//     data: users,
//   });
// });


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/dasboard", dashBoardRoute);
app.use("/api/v1/sales", salesRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/medicines", medicinesRoute);
app.use("/api/v1/customers", customersRoute);
app.use("/api/v1/suppliers", suppliersRoute);



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
