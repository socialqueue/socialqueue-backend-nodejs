import { DataTypes } from "sequelize"
import { sequelize } from "../../config/sequelize.js"


const User = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  mobile: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verifyAccountToken: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true
  },
  passwordResetTokenExpiryAt: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true
  }
}, {
  indexes: [
    // { unique: true, fields: ['id'] },
    { unique: true, fields: ['mobile'] },
    { unique: true, fields: ['email'] }
  ]
})


export default User
