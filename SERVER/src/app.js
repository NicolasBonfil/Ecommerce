import express from "express"
import mongoose from "mongoose" 
import cors from "cors"
import appRouter from "./routes/app.router.js"
import cookieParser from "cookie-parser"
import passport from "passport"
import path from "path"
import __dirname from "./dirname.js"
import CONFIG from "./config/config.js"

const {MONGO_URL, PORT} = CONFIG

const app = express()

app.use(express.json())

app.use('/products/images', express.static(path.join(__dirname, 'public', 'products', 'images')));

app.use(cors({
    origin: 'https://nicoecommerce.netlify.app',
    credentials: true
}))

app.use(cookieParser())

mongoose.connect(MONGO_URL, {dbName: "Nico"})

app.use("/api", appRouter)

app.use(passport.initialize())

app.listen(PORT, () => {
    console.log("Server up")
})