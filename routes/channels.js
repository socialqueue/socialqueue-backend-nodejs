import axios from "axios"
import express from "express"
import Channel from "../models/sql/Channel.js"

import {
    getUserChannels,
    getUserInfo,
    postLinkedinRequestAccessToken,
} from "../controllers/channels.js"


const router = express.Router()


router.get("/", getUserChannels)


router.get("/userInfo", getUserInfo)


router.post("/new/linkedin/request-access-token", postLinkedinRequestAccessToken)


export default router
