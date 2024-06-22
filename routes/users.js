import express from "express"

const router = express.Router()

/*
changePassword
editUser
deleteUser
getUser*/

// fetch all users
router.get("/", (req, res) => {
    res.send("users")
})

export default router
