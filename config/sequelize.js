import dotenv from "dotenv"
dotenv.config()


import { Sequelize } from "sequelize"


export const sequelize = new Sequelize(process.env.MYSQL_URI, {
    dialect: "mysql",
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 180000,
        idle: 60000
    }
})


const sequelizeConnect = async () => {
    try {
        await sequelize.authenticate()
        console.log("MySQL connection successful")

        await sequelize.sync({
            alter: true,
            // force: true
        })
        console.log("MySQL database synced")
    }
    catch (err) {
        console.log("MySQL connection failed. exiting now...")
        console.error(err)
        process.exit(1)
    }
}


export default sequelizeConnect
