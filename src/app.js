import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// core configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}));


// accepting json with express
app.use(express.json({limit:"16kb"}))
// url mein kuch search karne ke bad jo alag keywords kar dete hai uske liye 
app.use(express.urlencoded({extended:true,limit:"16kb"}));
// public asset folder
app.use(express.static("public"))




export {app}