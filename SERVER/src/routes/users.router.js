import { Router } from "express"
import passportControl from "../middlewares/passport-control.middleware.js"
import CONFIG from "../config/config.js"
import updateUser from "../utils/updateUser.js"
import { fakerES as faker } from '@faker-js/faker';
import UsersModel from "../models/schemas/users.js";

const {SESSION_COOKIE} = CONFIG

const router = Router()

router.get("/isLog", (req, res) => {
    if(!req.cookies[SESSION_COOKIE]) return res.status(200).send(false)

    res.status(200).send(true)
})

router.get("/", passportControl("jwt"), (req, res) => {
    res.send(req.user);
})

router.post("/add-address", passportControl("jwt"), async (req, res) => {
    const {street, streetNumber, complement, neighborhood, province, city, postalCode, addressCode} = req.body
    if(addressCode) return res.status(200).send()

    for(let key in req.body){
        if(key === "complement") continue;
        if (!req.body[key]) {
            return res.status(400).send({message: "Completa este campo"})
            break;
        }
    }

    let code;
    let existsCode;
    const user = await UsersModel.findOne({_id: req.user._id})

    do {
        code = faker.string.alphanumeric(10)
        existsCode = user.addresses.some((item)=> item.code == code)
    } while (existsCode);

    const address = {
        street,
        streetNumber,
        complement,
        neighborhood,
        province,
        city,
        postalCode,
        addressCode: code
    }

    console.log(address);

    const addresses = req.user.addresses || []
    addresses.push(address)
    
    try {
        updateUser(res, req.user, "addresses", addresses)
        res.status(200).send({message: "Se  ha agregado la dirección correctamente.", payload: code})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

export default router