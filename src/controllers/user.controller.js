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


//     //1)get user details from front-end
    
    // data from json or form
    // const { fullName, email, username, password} = req.body
    // console.log("email", email);

    //2)validation

//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "User registerd successfully")
//     )
const {fullName, email, username, password } = req.body
//console.log("email: ", email);

if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
) {
    throw new ApiError(400, "All fields are required")
}

const existedUser = await User.findOne({
    $or: [{ username }, { email }]
})

if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
}
//console.log(req.files);
    
    
    // -- multer gives access to files
    // avatar[0] represent first property . agar hum optionally le toh hum path likh sakte hai

    // -- multer gives access to files
    // avatar[0] represent first property . agar hum optionally le toh hum path likh sakte hai
const avatarLocalPath = req.files?.avatar[0]?.path;
//const coverImageLocalPath = req.files?.coverImage[0]?.path;

let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
}


if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
}


const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email, 
    password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
)

})


export {registerUser};