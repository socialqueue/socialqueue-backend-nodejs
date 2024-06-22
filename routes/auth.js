import express from "express"

import {
    postRegister,
    postLogin,
    postResetPasswordGenerateToken,
    postResetPasswordVerifyToken,
    postResetPasswordSetNew,
    postVerifyAccount
} from "../controllers/auth.js"


const router = express.Router()


// register
router.post("/register", postRegister)

// login
router.post("/login", postLogin)

// verify account
router.post('/verify-account/:token', postVerifyAccount)

// reset password generate token
router.post('/reset-password/generate-token', postResetPasswordGenerateToken)

// reset password verify token
router.post('/reset-password/verify-token/:token', postResetPasswordVerifyToken)

// reset password set new
router.post('/reset-password/set-new/:token', postResetPasswordSetNew)


export default router
