import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//settings for cross-origin-resource-sharing
// cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// accepting data in the form of json from front-end
// accepting json with express
app.use(express.json({ limit: "16kb" }));

// receiving data from url
// url mein kuch search karne ke bad jo alag keywords kar dete hai uske liye
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// public asset folder [public is a folder]
app.use(express.static("public"));

// Routes import
import userRouter from './routes/user.routes.js'


//routes declaration
// app.use("/users", userRouter)

app.use("/api/v1/users", userRouter)

// https://localhost:8000/api/v1/resiter

export { app };
