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

export { app };
