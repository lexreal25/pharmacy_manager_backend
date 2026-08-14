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

import { errorHandler } from "./src/middleware/errorHandler.js";
import { env } from "./src/config/env.js";


//Database connection
connectDB();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("short"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(errorHandler);
//sanitizes user input data (in req.body, req.query, req.headers and req.params) to prevent Cross Site Scripting (XSS) attack.
app.use(xss());


//session middleware sets cookies to expire after 30mins

app.use(
  expressSession({
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutes
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    },
    secret: env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: SessionStore,
  })
);



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/dasboard", dashBoardRoute);
app.use("/api/sales", salesRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/medicines", medicinesRoute);
app.use("/api/customers", customersRoute);
app.use("/api/suppliers", suppliersRoute);



const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
