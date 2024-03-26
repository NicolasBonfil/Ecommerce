import { Router } from "express"
import productsRouter from "./products.router.js"
import sessionsRouter from "./sessions.router.js"
import cartsRouter from "./carts.router.js"
import usersRouter from "./users.router.js"
import ticketRouter from "./tickets.router.js"

const router = Router()

router.use("/products", productsRouter)
router.use("/sessions", sessionsRouter)
router.use("/carts", cartsRouter)
router.use("/users", usersRouter)
router.use("/tickets", ticketRouter)

export default router