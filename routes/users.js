import express from "express"
import functions  from "../controllers/users.js"

const userRouter = express.Router()

userRouter.post("/signup",functions.signup)
userRouter.post("/login",functions.login)

export default userRouter