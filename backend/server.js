import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import commonRouter from "./routes/commonRoute.js";
import khandanRouter from "./routes/khandanRoute.js";
import additionalRouter from "./routes/additionalRoute.js";
import todoRouter from "./routes/todoRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS configuration with whitelisted domains
const allowedOrigins = process.env.ALLOWED_CORS_ORIGINS;
console.log("Allowed CORS Origins:", allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If you need to send cookies/auth headers
  optionsSuccessStatus: 200, // For legacy browser support
};

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/khandan", khandanRouter);
app.use("/api/admin", adminRouter);
app.use("/api/c", commonRouter);
app.use("/api/additional", additionalRouter);
app.use("/api/todopages", todoRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server Started", port));
