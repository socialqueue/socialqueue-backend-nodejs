/*
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                import modules
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
*/

// import third party modules
import dotenv from "dotenv"
dotenv.config()

// !csrf attack
import express from "express"
import bodyParser from "body-parser"
import path from 'path'


// import constants module files
import * as responseCodes from "../constants/http-response-codes.js"
import __dirname from "../util/path.js"




/*
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                set middlewares
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
*/

const app = express()



// additional settings for production environment
if (process.env.NODE_ENV === 'production') {
}



// parse request from form data
// app.use(bodyParser.urlencoded({ extended: false }))

// parse request from json data
app.use(bodyParser.json())







// serve static files
app.use('/static', express.static(path.join(__dirname, "..", "public")))




// hide server techstack
app.disable('x-powered-by')


// s
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000, http://localhost:5000")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})


/*
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                configure routes
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
*/

// auth route
import authRoute from "../routes/auth.js"
app.use("/auth", authRoute)

// users route
import usersRoute from "../routes/users.js"
app.use("/users", usersRoute)


// error handler middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


// base route
app.get("/", (req, res) => {
    return res.send("Backend server is up and running")
})




// not found error response for undefined routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    console.log(error)
    next(error);
})




app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    return res
        .status(status)
        .json({
            message: message
        });
});



export default app


/*
body-parser
compression
connect-rid
cookie-parser
cookie-session
cors
errorhandler
method-override
morgan
multer
response-time
serve-favicon
serve-index
serve-static
session
timeout
vhost
----- ----- ----- ----- 
helmet
express-validator
*/
