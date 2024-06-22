/*
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
                import modules
---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
*/

// import third party modules
import dotenv from "dotenv"
dotenv.config()


// import config module files
import app from "./config/express.js"
import redisConnect from "./config/redis.js"
import mongooseConnect from "./config/mongoose.js"
import sequelizeConnect from "./config/sequelize.js"
import sequelizeRelationsInit from "./config/sequelize-relations-init.js"


// set server port
const PORT = process.env.PORT || 5000


const databaseInit = async () => {
    // initialize mysql relations
    sequelizeRelationsInit()
    // // initialize redis connection
    // await redisConnect()
    // // initialize monogdb connection
    // await mongooseConnect()
    // initialize mysql connection
    await sequelizeConnect()

}


// initialize database connections
databaseInit()


// run server on specified PORT
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
})
