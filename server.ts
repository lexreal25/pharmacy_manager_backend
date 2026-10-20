import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { SessionStore } from "./src/utils/session.store.js";
import { xss } from "express-xss-sanitizer";
import expressSession from "express-session";
import cookieParser from "cookie-parser";

import authRoute from "./src/routes/authRoute.js";
import dashBoardRoute from "./src/routes/dashBoardRoute.js";
import salesRoute from "./src/routes/salesRoute.js";
import inventoryRoute from "./src/routes/inventoryRoute.js";
import userRoute from "./src/routes/userRouth.js";
import medicinesRoute from "./src/routes/medicineRoute.js";
import customersRoute from "./src/routes/customersRoute.js";
import suppliersRoute from "./src/routes/suppliersRouter.js";
import productsRoute from "./src/routes/productsRoute.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.ts";

import { errorHandler } from "./src/middleware/errorHandler.ts";

//Database connection
connectDB();

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("short"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(bodyparser.urlencoded({ extended: true, limit: "1mb" }));

//sanitizes user input data (in req.body, req.query, req.headers and req.params) to prevent Cross Site Scripting (XSS) attack.
// app.use(xss());
app.use(cookieParser());
//session middleware sets cookies to expire after 30mins

app.use(
  expressSession({
    secret: env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: SessionStore,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/dasboard", dashBoardRoute);
app.use("/api/sales", salesRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/medicines", medicinesRoute);
app.use("/api/customers", customersRoute);
app.use("/api/suppliers", suppliersRoute);

app.use(errorHandler);

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

