import axios from "axios"
import express from "express"
import Post from "../models/sql/Post.js"
import PostContent from "../models/nosql/PostContent.js"

import {
    getUserposts,
    getUserInfo,
    postLinkedinRequestAccessToken,
} from "../controllers/posts.js"


const router = express.Router()


router.get("/", getUserposts)


router.get("/userInfo", getUserInfo)


router.post("/new/linkedin/request-access-token", postLinkedinRequestAccessToken)


export default router
