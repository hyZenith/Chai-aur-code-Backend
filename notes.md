first command for node modules
> npm init

"type":"module",

"scripts": {
"dev ": "nodemon src/index.js"
},

npm i -D nodemon


cd src/
touch app.js constants.js index.js
mkdir controllers db middlewares models routes utils

npm i -D prettier
touch .prettier.js .prettierignore.js

 configure --.prettierrc
{
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "semi": true
    ....etc
}


# configure --.prettierignore.js
/.vscode
/node_modules
./dist
*.env
.env
.env.*



# Database connection
 npm i dotenv express  mongoose

for dotenv
 in package.json "dev": -r dotenv/config --experimental-json-modules


# custom api and error handling
  > async method always return promise , for that .then and .catch used in [index.js]

    npm i cookie-parser cors
    app.use -->used in the case of middlware

 <!--creating asyncHandler in utils folder  -->
 <!-- creating ApiError in utils folder -->


# User and video model with hooks and JWT
  > creating files in models
        -user.model.js
        -video.model.js

   installing npm i mongoose-aggregate-paginate-v2
     > import mongooseaggregatepaginte
     then export before the model export
   installing npm i bcrypt
      --> bcrypt is a library to help hash passwords
   installing npm i jsonwebtoken
     -->for encryption payload(just think as encrypting datas)


     bcrypt and jsonwebtoken is imported in user.model.js

 ** directly encryption is not possible , so we have to use some hooks from mongoose


# File upload in Backend
 > two packages are used for file uploading
  1) express fileupload
  2) Multer(mostly used )

  >> after login in cloudinary.com
    installing cloudinary
    --  npm install cloudinary
    installing multer for file uploading
    -- npm i multer

       > ## creating cloudinary.js in utils folder for cloudinary code
        //after writing the code on cloudinary.js
        > creating middleware with the help of multer
         > creating multer.middleware.js


# Router and Controller with debugging
 - Routes import in app.js
  import routername from './path' 


# Logic Building | Register Controller

  Logic for registering user (depend on the datas u get from front-end || user.model.js)>

  // get user details from front-end
  //validation -- not empty
  //check if user already exist : username ,email
  // check for images,check for the avatar
  //upload to cloudinary ,check avatar 
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  // return response


# Use Postman for Backend



# Access refresh token 
creating loginUser 

User is mongodb User(capital User)
user is created by me

after checking user and password
create refresh token  
 
new method is created for refreshToken


for logoutuser -> refreshToken should be clear
creating own middleware in middleware folder -> auth.middleware.js , it will check whether user is there or not