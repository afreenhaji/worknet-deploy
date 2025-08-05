// path: backend/index.js
import express from "express";
import authRouter from "./routes/auth.routes.js";
import protectedRouter from "./routes/protected.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import postRouter from './routes/post.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Dynamic CORS Configuration
const allowedOrigins = [
  'https://work-net.vercel.app',  // Production Frontend URL
  'http://localhost:3000'          // Local development (Optional)
];

// Wildcard for Vercel Preview Deployments (Regex Match)
const dynamicCors = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow server-to-server or curl requests

    const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/work.*\.vercel\.app$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(dynamicCors));

// Static folder for image serving
app.use("/public", express.static("public"));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", protectedRouter);
app.use("/api/post", postRouter);

// Health check route (optional)
app.get("/", (req, res) => {
  res.send("✅ WorkNet backend is up and running!");
});

// DB connection and server start
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB connection failed:", error.message);
  });
