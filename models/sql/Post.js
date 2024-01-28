import { DataTypes } from "sequelize"
import { sequelize } from "../../config/sequelize.js"


const Post = sequelize.define('post', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  scheduledTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: null
  },
}, {
  indexes: [
    // { unique: true, fields: ['id'] },
    { unique: true, fields: ['scheduledTime'] },
    { unique: true, fields: ['status'] }
  ]
})


export default Post
