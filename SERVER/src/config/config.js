import dotenv from "dotenv"

dotenv.config()

const CONFIG = {
    MONGO_URL: process.env.MONGO_URL || "",
    PORT: process.env.PORT || "8080",
    SECRET_KEY: process.env.SECRET_KEY || "",
    SESSION_COOKIE: process.env.SESSION_COOKIE || "",
    PASSWORD_COOKIE: process.env.PASSWORD_COOKIE || ""
}

export default CONFIG