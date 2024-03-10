import { DataTypes } from "sequelize"
import { sequelize } from "../../config/sequelize.js"


const UserLogin = sequelize.define('userLogin', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    ipAddress: {
        type: DataTypes.STRING,
        // allowNull: false
    }
}, {
    updatedAt: false,
    createdAt: "loginAt",
    indexes: [
        // { unique: true, fields: ['id'] },
    ]
})


export default UserLogin
