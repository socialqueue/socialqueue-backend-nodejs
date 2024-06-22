import axios from "axios"
import express from "express"
import Post from "../models/sql/Post.js"
import PostContent from "../models/nosql/PostContent.js"
import Channel from "../models/sql/Channel.js"

import {
    getUserPosts,
} from "../controllers/posts.js"


const router = express.Router()


router.get("/", getUserPosts)


// router.post("/create-new-post", postCreateNewLinkedInPost)
router.post("/create-new-linkedin-post", async (req, res, next) => {
    try {
        const userId = +req.body.userId
        console.log(userId)
        const platform = "linkedin"
        console.log(platform)


        const linkedinFetchUserBaseUrl = "https://api.linkedin.com/v2/userinfo"

        const channel = await Channel.findOne({
            where: {
                userId: userId,
                platform: platform
            }
        })
        console.log(channel)

        const access_token = channel?.dataValues.access_token
        const bearer_token = `Bearer ${access_token}`

        const config = {
            headers: {
                Authorization: bearer_token
            }
        }

        const query = `${linkedinFetchUserBaseUrl}`

        const response = await axios.get(query, config)


        const postVisibility = req.body.postVisibility
        console.log(postVisibility)

        const userSub = response.data.sub
        console.log(userSub)



        /*
        CONNECTIONS
        PUBLIC
        */
        const q = {
            "author": `urn:li:person:${userSub}`,
            "lifecycleState": "PUBLISHED",


            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": "Hello World! This is my first Share on LinkedIn!"
                    },
                    "shareMediaCategory": "NONE"
                }
            },


            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": postVisibility
            }
        }

        return res
            .status(201)
            .json("posts")
    }
    catch (error) {
        return next(error)
    }
})






export default router
