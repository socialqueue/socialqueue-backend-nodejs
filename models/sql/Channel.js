import { DataTypes } from "sequelize"
import { sequelize } from "../../config/sequelize.js"


const Channel = sequelize.define('channel', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  indexes: [
    // { unique: true, fields: ['id'] },
    { unique: true, fields: ['platform'] },
  ]
})


export default Channel
