import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as crypto from 'crypto';

import transporter from "../config/nodemailer.js"
import {
    postRegister,
    postLogin,
    postResetPasswordGenerateToken,
    postResetPasswordVerifyToken,
    postResetPasswordSetNew,
    postVerifyAccount
} from "../controllers/auth.js"

import User from "../models/sql/User.js"
import { Sequelize, Op } from "sequelize"

const router = express.Router()


/*
send-verification-code
refresh-token
*/


// register
router.post("/register", postRegister)

// login
router.post("/login", postLogin)

// verify account
router.post('/verify-account', postVerifyAccount);

// reset password generate token
router.post('/reset-password/generate-token', postResetPasswordGenerateToken);

// reset password verify token
router.post('/reset-password/verify-token/:token', postResetPasswordVerifyToken);

// reset password set new
router.post('/reset-password/set-new/:token', postResetPasswordSetNew);


export default router
