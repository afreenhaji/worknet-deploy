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

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [ "http://localhost:5173", "https://your-vercel-frontend-url.vercel.app" ],
  credentials: true
}));

app.use("/public", express.static("public")); // serve images from public folder

app.use("/api/auth", authRouter);
app.use("/api/user", protectedRouter);
app.use('/api/post', postRouter);

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
