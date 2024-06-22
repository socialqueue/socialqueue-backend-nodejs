import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as crypto from 'crypto'
import { Sequelize, Op } from "sequelize"
import transporter from "../config/nodemailer.js"
import User from "../models/sql/User.js"
import UserLogin from "../models/sql/UserLogin.js"


export const postRegister = async (req, res, next) => {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const mobile = req.body.mobile
        const email = req.body.email
        const password = req.body.password
        const lastLoginAt = new Date()

        if (!email) {
            const error = new Error('Insufficient Request Body - No email')
            error.statusCode = 422
            throw error
        }

        if (!password) {
            const error = new Error('Insufficient Request Body - No password')
            error.statusCode = 422
            throw error
        }

        if (!firstName) {
            const error = new Error('Insufficient Request Body - No firstName')
            error.statusCode = 422
            throw error
        }

        const oldUser = await User.findOne({
            attributes: ['email'],
            where: {
                email: email
            }
        })

        if (oldUser) {
            return res
                .status(201)
                .json({
                    message: 'User with given email already exists.',
                })
        }

        const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS)

        const randomBytesBuffer = crypto.randomBytes(32)
        const verifyAccountToken = randomBytesBuffer.toString('hex')

        const CURRENT_DATE = new Date()

        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            passwordHash: passwordHash,
            verifyAccountToken: verifyAccountToken,
            createdAt: CURRENT_DATE,
        })

        const sentMail = await transporter.sendMail({
            from: 'noreply@socialqueue.com',
            to: email,
            subject: 'Confirm SocialQuene Account',
            html: `
                    <h1>You have successfully signed up!</h1>
                    <p>Click this <a href="http://localhost:3000/reset/${verifyAccountToken}">link</a> to verify your account.</p>
                    <p>${verifyAccountToken}</p>
                  `
        })

        const user = newUser.dataValues
        user.userId = user.id

        delete user.passwordHash
        delete user.id

        const jwtToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '30 days' }
        )

        const ipAddress = "127.0.0.1"
        const userLogin = await UserLogin.create({
            userId: user.userId,
            ipAddress: ipAddress,
            loginAt: CURRENT_DATE
        })

        return res
            .status(201)
            .json({
                message: 'New user registered successfully',
                token: jwtToken,
                user: user
            })
    }
    catch (err) {
        return next(err)
    }
}


export const postLogin = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email) {
            const error = new Error('Insufficient Request Body - No email')
            error.statusCode = 422
            throw error
        }

        if (!password) {
            const error = new Error('Insufficient Request Body - No password')
            error.statusCode = 422
            throw error
        }

        const users = await User.findAll({
            where: {
                email: email
            }
        })

        if (users.length == 0) {
            return res
                .status(201)
                .json({
                    message: 'User with given email does not exist.',
                })
        }

        const user = users[0].dataValues

        const isCorrect = await bcrypt.compare(password, user.passwordHash)

        if (!isCorrect) {
            const error = new Error('Wrong password.')
            error.statusCode = 401
            throw error
        }

        user.userId = user.id

        delete user.passwordHash
        delete user.id

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '30 days' }
        )

        const CURRENT_DATE = new Date()
        const ipAddress = "127.0.0.1"
        const userLogin = await UserLogin.create({
            userId: user.userId,
            ipAddress: ipAddress,
            loginAt: CURRENT_DATE
        })

        return res
            .status(201)
            .json({
                message: 'Logged in successfully',
                token: token,
                user: user
            })
    }
    catch (err) {
        next(err)
    }
}


export const postVerifyAccount = async (req, res, next) => {
    try {
        const verifyAccountToken = req.params.token

        const users = await User.update({
            isVerified: true,
            verifyAccountToken: null,
        }, {
            where: {
                verifyAccountToken: verifyAccountToken,
            }
        })

        if (users[0] == 0) {
            return res
                .status(201)
                .json({
                    message: 'Account verification token is invalid',
                    token: verifyAccountToken,
                    isTokenValid: false
                })
        }

        return res
            .status(201)
            .json({
                message: 'Account verification successful',
            })
    }
    catch (error) {
        return next(error)
    }
}


export const postResetPasswordGenerateToken = async (req, res, next) => {
    try {
        const email = req.body.email

        const randomBytesBuffer = crypto.randomBytes(32)
        const token = randomBytesBuffer.toString('hex')

        const users = await User.update({
            passwordResetToken: token,
            passwordResetTokenExpiryAt: new Date(Date.now() + 3600000)
        }, {
            where: {
                email: email
            }
        })

        if (users.length == 0) {
            return res
                .status(422)
                .json({
                    message: 'User with given email does not exist',
                    token: passwordResetToken,
                    isTokenValid: false
                })
        }

        const sentMail = await transporter.sendMail({
            from: 'noreply@socialqueue.com',
            to: email,
            subject: 'Account Password Reset',
            html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set new password.</p>
                    <p>${token}</p>
                    `
            // http://localhost:3000/auth/reset-password/set-new
        })

        return res
            .status(201)
            .json({
                message: 'Password reset link sent to given email',
                email: email
            })
    }
    catch (error) {
        return next(error)
    }
}


export const postResetPasswordVerifyToken = async (req, res, next) => {
    try {
        const passwordResetToken = req.params.token

        const user = await User.findOne({
            where: {
                passwordResetToken: passwordResetToken,
                passwordResetTokenExpiryAt: {
                    [Sequelize.Op.gt]: Date.now()
                }
            }

        })

        if (!user) {
            return res
                .status(422)
                .json({
                    message: 'Password reset token is invalid',
                    token: passwordResetToken,
                    isTokenValid: false
                })
        }

        return res
            .status(201)
            .json({
                message: 'Token is valid for password reset',
                token: passwordResetToken,
                isTokenValid: true
            })
    }
    catch (error) {
        return next(error)
    }
}


export const postResetPasswordSetNew = async (req, res, next) => {
    try {
        const password = req.body.password
        const passwordResetToken = req.params.token

        const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS)

        const user = await User.update({
            passwordHash: passwordHash,
            passwordResetToken: null,
            passwordResetTokenExpiryAt: null
        }, {
            where: {
                passwordResetToken: passwordResetToken,
                passwordResetTokenExpiryAt: {
                    [Sequelize.Op.gt]: Date.now()
                }
            }
        })

        console.log(user)

        if (!user) {
            return res
                .status(201)
                .json({
                    message: 'Password reset token is invalid',
                    token: passwordResetToken,
                    isTokenValid: false
                })
        }

        return res
            .status(201)
            .json({
                message: 'Password reset successful',
            })
    }
    catch (error) {
        return next(error)
    }
}
