import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
// fs is file-system in node js
// 

//configuration 
// cloud_names,api_key,api_secret is kept in .env file 
cloudinary.config({ 
  cloud_name: process.env. CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET  
});

//for uploading asset
// for better organize method is used 

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


const uploadOnCloudinary = async (localFilePath) =>{
    try {
       if(!localFilePath)return null
       //upload the file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        //file has been uplaoded
        console.log("file is uplaoded on cloudinary", 
        response.url);
        return response;

    } catch (error) {
       fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the  upload operation got failed
       return null;

    }

}

export {uploadOnCloudinary}