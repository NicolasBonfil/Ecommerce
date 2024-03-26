import { Router } from "express";
import passportControl from "../middlewares/passport-control.middleware.js";
import updateUser from "../utils/updateUser.js";
import { fakerES as faker } from '@faker-js/faker';
import TicketModel from "../models/schemas/tickets.js";
import moment from "moment-timezone"

const router = Router()

router.post("/", passportControl("jwt"), async (req, res) => {
    const { cart, userId, receiver, code} = req.body
    
    const user = req.user
    const purchases = user.purchases || []
    
    try {
        const fechaHoraArgentina = moment().tz('America/Argentina/Buenos_Aires');
        const formato = 'YYYY-MM-DD HH:mm:ss';
        const fechaActual = fechaHoraArgentina.format(formato);
        
        const ticket = {
            products: cart.productsInCart,
            date: fechaActual,
            code: code,
            userId,
            addressCode: code,
            receiver
        }
    
        purchases.push(ticket)
        updateUser(res, user, "purchases", purchases)
        TicketModel.create(ticket)
        res.status(200).send({message: "Se realizó la compra con exito"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }

})

export default router