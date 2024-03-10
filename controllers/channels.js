import axios from "axios"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as crypto from 'crypto'
import { Sequelize, Op } from "sequelize"
import transporter from "../config/nodemailer.js"
import Channel from "../models/sql/Channel.js"
import User from "../models/sql/User.js"


export const getUserChannels = async (req, res, next) => {
    try {
        console.log("req.query", req.query)
        const userId = req.query.userId
        const channels = await Channel.findAll({
            attributes: ['id', 'platform'],
            where: {
                userId: +userId
            }
        })

        console.log(channels[0]?.dataValues)

        return res
            .status(201)
            .json(channels)
    }
    catch (error) {
        return next(error)
    }
}


export const getUserInfo = async (req, res, next) => {
    try {
        const userId = req.query.userId
        const platform = req.query.platform

        const linkedinFetchUserBaseUrl = "https://api.linkedin.com/v2/userinfo"

        const channel = await Channel.findOne({
            where: {
                userId: userId,
                platform: platform
            }
        })

        const access_token = channel.dataValues.access_token
        const bearer_token = `Bearer ${access_token}`

        const config = {
            headers: {
                Authorization: bearer_token
            }
        }

        const query = `${linkedinFetchUserBaseUrl}`

        const response = await axios.get(query, config)

        return res
            .status(201)
            .json({
                message: 'Channel connected successfully',
                userInfo: response.data
            })

    }
    catch (error) {
        return next(error)
    }
}


export const postLinkedinRequestAccessToken = async (req, res, next) => {
    try {
        console.log("postLinkedinRequestAccessToken")
        const authorization_code = req.body.authorization_code
        const redirect_uri = req.body.redirect_uri

        const linkedinBaseUrl = "https://www.linkedin.com/oauth/v2/accessToken"
        const requestParams = {
            grant_type: "authorization_code",
            code: authorization_code,
            redirect_uri: redirect_uri,
            client_id: "776gpdeprmul5x",
            client_secret: "Tzy5na7U2XXLesCl"
        }
        const query = `${linkedinBaseUrl}?grant_type=${requestParams.grant_type}&code=${requestParams.code}&redirect_uri=${requestParams.redirect_uri}&client_id=${requestParams.client_id}&client_secret=${requestParams.client_secret}`
        const response = await axios.post(query)

        const userId = req.body.userId
        const platform = "linkedin"
        const access_token = response.data.access_token
        const expires_in = response.data.expires_in * 1000
        const scope = response.data.scope
        const token_type = response.data.token_type
        const id_token = response.data.id_token
        const valid_till = new Date(Date.now() + expires_in)

        const oldChannel = await Channel.findOne({
            where: {
                platform: platform,
                userId: userId
            }
        })

        if (oldChannel)
            await oldChannel.destroy()

        const newLinkedinChannel = await Channel.create({
            platform: platform,
            access_token: access_token,
            expires_in: expires_in,
            scope: scope,
            token_type: token_type,
            id_token: id_token,
            valid_till: valid_till,
            userId: userId
        })

        return res
            .status(201)
            .json({
                message: 'Channel connected successfully',
            })
    }
    catch (error) {
        return next(error)
    }
}



