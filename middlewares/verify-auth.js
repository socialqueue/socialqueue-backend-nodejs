export const f = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next()
}


// packages
const jwt = require("jsonwebtoken")

// environment variables
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

// database models
const Instructor = require("../models/Instructor")
const Lecture = require("../models/Lecture")

// response codes
const RES_CODES = require("../constants/resCodes.js")


// verify token
const verifyToken = (req, res, next) => {
    const TOKEN =
        req.body.token || req.query.token || req.headers["x-access-token"]

    if (!TOKEN) {
        return res.status(RES_CODES.STATUS_ERR_CLIENT_UNAUTHORISED).send({ MSG: "Token is required for authentication", ERR: RES_CODES.ERR_NO_TOKEN })
    }
    try {
        const decoded = jwt.verify(TOKEN, JWT_PRIVATE_KEY)
        req.user = decoded
    } catch (err) {
        return res.status(RES_CODES.STATUS_ERR_CLIENT_UNAUTHORISED).send({ MSG: "Token is invalid", ERR: RES_CODES.ERR_INVALID_TOKEN })
    }
    return next()
}


// verify token and if user is admin or self
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"
        const USER_IS_SELF = req.user.id === req.params.id

        if (USER_IS_SELF || USER_IS_ADMIN) {
            return next()
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_USER })
        }
    })
}


// verify token and if user is admin
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"

        if (USER_IS_ADMIN) {
            return next()
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_ADMIN })
        }
    })
}


// verify token and if user is admin or instructor
const verifyTokenAndInstructor = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"
        const USER_IS_INSTRUCTOR = req.user.user_type === "instructor"

        if (USER_IS_INSTRUCTOR || USER_IS_ADMIN) {
            return next()
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR })
        }
    })
}


// verify token and if user is admin or student
const verifyTokenAndStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"
        const USER_IS_STUDENT = req.user.user_type === "student"

        if (USER_IS_STUDENT || USER_IS_ADMIN) {
            return next()
        }
        else {
            return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_STUDENT })
        }
    })
}


// verify token and if course creator is admin or instructor
const verifyTokenAndCourseInstructor = (req, res, next) => {
    verifyToken(req, res, async () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"
        const USER_IS_INSTRUCTOR = req.user.user_type === "instructor"

        if (USER_IS_ADMIN) {
            return next()
        }
        else if (USER_IS_INSTRUCTOR) {
            const REQUEST_PARAMETER_CONTAINS_COURSE_ID = req.params.courseId !== undefined

            // check request url parameter contains courseId
            if (REQUEST_PARAMETER_CONTAINS_COURSE_ID) {
                const user_id = req.user.user_id
                const course_id = req.params.courseId
                const instructor = await Instructor.findById(user_id)
                const USER_IS_COURSE_INSTRUCTOR = instructor.createdCourses_id.includes(course_id)

                // check instructor teaches the course
                if (USER_IS_COURSE_INSTRUCTOR) {
                    return next()
                }
                else {
                    return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR })
                }
            }
            else {
                return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR })
            }
        }

        return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR })
    })
}


// verify token and if lecture creator is admin or instructor
const verifyTokenAndLectureInstructor = (req, res, next) => {
    verifyToken(req, res, async () => {
        const USER_IS_ADMIN = req.user.user_type === "admin"
        const USER_IS_INSTRUCTOR = req.user.user_type === "instructor"

        if (USER_IS_ADMIN) {
            return next()
        }
        else if (USER_IS_INSTRUCTOR) {
            const REQUEST_PARAMETER_CONTAINS_LECTURE_ID = req.params.lectureId !== undefined

            // check request url parameter contains lectureId
            if (REQUEST_PARAMETER_CONTAINS_LECTURE_ID) {
                const user_id = req.user.user_id
                const lecture_id = req.params.lectureId
                const instructor = await Instructor.findById(user_id)
                const USER_IS_LECTURE_INSTRUCTOR = instructor.createdLectures_id.includes(lecture_id)

                // check instructor teaches the lecture
                if (USER_IS_LECTURE_INSTRUCTOR) {
                    return next()
                }
                else {
                    return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR })
                }
            }
            else {
                return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR })
            }
        }

        return res.status(RES_CODES.STATUS_ERR_CLIENT_FORBIDDEN).send({ MSG: "Not allowed", ERR: RES_CODES.ERR_UNAUTHORISED_INSTRUCTOR })
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndInstructor,
    verifyTokenAndStudent,
    verifyTokenAndCourseInstructor,
    verifyTokenAndLectureInstructor
}