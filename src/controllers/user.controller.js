import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

const registerUser = asyncHandler( async (req,res) => {
    // res.status(200).json({
    //     message:"ok"
    // });


    //1)get user details from front-end
    
    // data from json or form
    const {fullName, email, username, password} = req.body
    console.log("email", email);

    //2)validation

    // if(fullName == ""){
    //     throw new ApiError(400,"fullName is required")
    // }
    
   if (
    [fullName, email, username, password].some((field)=> 
    field?.trim() === "")
   ) {
        throw new ApiError(400, "All field are required") 
   } 

    //3)check  if user already exist or not
    const existedUser = User.findOne({
        // $or used for checking multiple value
        $or: [{username},{email}]
    })
    
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists");
    }
    
    // -- multer gives access to files
    // avatar[0] represent first property . agar hum optionally le toh hum path likh sakte hai
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocatPath = req.files?.coverImage[0]?.path;

    //4)check whether avatar has come or not
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar field is required")
        
    }
    // 5)Uplaod on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocatPath)

    // chekc avatar
    if (!avatar) {
        throw new ApiError(400, "avatar field is required")
    }

    //6)create user object
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering user")
    }
    // for properly structure response ApiResponse is used

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registerd successfully")
    )

})


export {registerUser};