// require('dotenv').config({path: './env})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
  path: "./.env",
});

connectDB()
  // video -- error handling
  
  .then(() => {
    // app.on("error", (error) => {
    //   console.log("Error:", error);
    //   throw error;
    // });

    // sometimes error is listened before running app.listen
    
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at Port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed: ", err);
  });

/*

// another method
import mongoose, { mongo } from "mongoose";
import {DB_NAME} from "./constants"
import  express  from "express";
const app = express();

(async()=>{
    try {
       mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=> {
            console.log("Error:",error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`App listening on ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error:", error);
        throw err
    }
})();
*/
