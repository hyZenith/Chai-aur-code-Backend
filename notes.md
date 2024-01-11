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
 
 configure --.prettier.js
 {
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "semi": true
    ....etc
}

configure --.prettierignore.js
/.vscode
/node_modules
./dist
*.env
.env
.env.*



#Database connection
 npm i dotenv express  mongoose
 
for dotenv 
 in package.json "dev": -r dotenv/config --experimental-json-modules
