import { DataTypes } from "sequelize"
import { sequelize } from "../../config/sequelize.js"


const PostAnalytic = sequelize.define('postAnalytic', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  shares: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  engagementMetrics: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  indexes: [
    // { unique: true, fields: ['id'] },
  ]
})


export default PostAnalytic
