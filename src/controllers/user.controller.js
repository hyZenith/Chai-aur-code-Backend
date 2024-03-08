import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accressToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // for saving refresh Token in database
    user.refreshToken = refreshToken;
    // save in object
    //when we use save()  method ,password field will also kickin and there is no password . so for that we use validateBeforeSave : false
    await user.save({ validateBeforeSave: false });

    return { accressToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
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
  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  //console.log(req.files);

  // -- multer gives access to files
  // avatar[0] represent first property . agar hum optionally le toh hum path likh sakte hai

  // -- multer gives access to files
  // avatar[0] represent first property . agar hum optionally le toh hum path likh sakte hai
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req.body => data
  //username or email
  //find the user
  //password check
  //access and refresh token
  //send cookies
  const { email, username, password } = req.body;
  if (!username || email) {
    throw new ApiError(400, "username or password is required");
  }
  const user = await user.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError((404, "user does not exist"));
  }
  const ispasswordValid = await user.isPasswordCorrect(password);

  if (!ispasswordValid) {
    throw new ApiError(401, "Invalid user credintials");
  }

  const { refreshToken, accressToken } = await generateAccessAndRefreshToken(
    user._id
  );

  //Down line is  optional
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //For sending cookies , httpOnly and secure is used for modifing cookies only in server side
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accressToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accressToken,
          refreshToken,
        },
        "User loggedIn successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      // $set is an operator for updating
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {} < "User logged Out"));
});

export { registerUser, loginUser, logoutUser };
