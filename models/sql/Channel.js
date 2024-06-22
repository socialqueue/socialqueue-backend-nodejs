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
  access_token: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  expires_in: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  scope: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_token: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  valid_till: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  indexes: [
    // { unique: true, fields: ['id'] },
    { unique: true, fields: ['platform'] },
  ]
})


export default Channel
