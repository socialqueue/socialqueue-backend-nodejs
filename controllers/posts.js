import axios from "axios"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as crypto from 'crypto'
import { Sequelize, Op } from "sequelize"
import transporter from "../config/nodemailer.js"
import User from "../models/sql/User.js"
import Post from "../models/sql/Post.js"
import PostContent from "../models/nosql/PostContent.js"


export const getUserPosts = async (req, res, next) => {
    try {
        console.log("req.query", req.query)
        const userId = req.query.userId
        const posts = await Post.findAll({
            // attributes: ['id', 'platform'],
            where: {
                userId: +userId
            }
        })

        console.log(posts[0]?.dataValues)

        return res
            .status(201)
            .json(posts)
    }
    catch (error) {
        return next(error)
    }
}
