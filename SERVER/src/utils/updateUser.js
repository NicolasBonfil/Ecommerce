import CONFIG from "../config/config.js"
import UsersModel from "../models/schemas/users.js"
import { generateToken } from "./token.js"

const {SESSION_COOKIE} = CONFIG

const updateUser = async (res, user, key, value) => {
    user[key] = value
    const access_token = generateToken(user)
    res.cookie(SESSION_COOKIE, access_token, {
        maxAge: 60*60*1000,
        httpOnly: true,
        sameSite: "none",
        secure: true
    })

    await UsersModel.updateOne({_id: user._id}, user)
}

export default updateUser