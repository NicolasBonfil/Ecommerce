import { Router } from "express"
import UsersModel from "../models/schemas/users.js"
import { generateToken } from "../utils/token.js"
import { createHash, isValidPassword } from "../utils/password.js"
import CONFIG from "../config/config.js"
import nodemailer from "nodemailer"
import { fakerES as faker } from '@faker-js/faker';
import jwt from "jsonwebtoken"

const {SESSION_COOKIE, SECRET_KEY, PASSWORD_COOKIE} = CONFIG

const router = Router()

router.post("/login", async (req, res) => {
    const {email, password} = req.body

    for(let key in req.body){
        if (!req.body[key]) {
            return res.status(400).send({message: "Completa este campo"})
        }
    }

    try{
        const user = await UsersModel.findOne({email})

        if(!user || !isValidPassword(user, password)) return res.status(401).send({message: "Usuario y/o contraseña incorrecto"})

        res.clearCookie(SESSION_COOKIE)

        const access_token = generateToken(user)
        res.cookie(SESSION_COOKIE, access_token, {
            maxAge: 60*60*1000,
            httpOnly: true,
            sameSite: "none",
            secure: true
        })

        res.status(200).send({message: "Se inició sesión correctamente"})
    }catch(error){
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }

})
router.post("/register", async (req, res) => {
    const {first_name, last_name, email, password, confirmPassword, phone} = req.body

    for(let key in req.body){
        if (!req.body[key]) {
            return res.status(400).send({message: "Completa este campo"})
        }
    }
    
    const isSafePassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
    if(!isSafePassword) return res.status(400).send({message: "La contraseña debe contener al menos: 8 caracteres, una mayusucula, una minusucula, un numero y un caracter especial (@, #, $, etc)"})

    if(password !== confirmPassword) return res.status(400).send({message: "Las contraseñas no coinciden"})

    
    const userExists = await UsersModel.findOne({email})
    
    if(userExists){
        return res.status(400).send({message: "Ya existe una cuenta con el mismo correo electrónico"}) 
    }
    const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password),
        phone
    }
    
    try {
        await fetch("https://ecommerce-1-s9zq.onrender.com/api/carts", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(res => {
            newUser.cart = res.payload
        })
        
        await UsersModel.create(newUser)
        res.status(200).send({message: "Usuario creado"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})
router.post("/logout", (req, res) => {
    try {
        res.clearCookie(SESSION_COOKIE)
        res.status(200).send({message: "Se cerró sesión correctamente"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})


router.post("/request-password-reset", async (req, res) => {
    const {email} = req.body

    if(!email) return res.status(400).send({message: "Completa este campo"})

    const user = await UsersModel.findOne({email})

    if(!user) return res.status(404).send({message: "Usuario inexistente"})

    const code = faker.string.numeric({length: 5})

    const data = {
        user: user,
        code: code
    }

    const token =  jwt.sign(data, SECRET_KEY, { expiresIn: '24h' })
    res.cookie(PASSWORD_COOKIE, token, {
        maxAge: 60*60*1000,
        httpOnly: true,
        sameSite: "none",
        secure: true
    })

    const transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: "bonfil.nico@gmail.com",
            pass: "vyqnhaelimvkhewk"
        }
    })

    const mailParms = {
        from: "bonfil.nico@gmail.com",
        to: email,
        subject: `${user.first_name} este es tu PIN`,
        html: `
                <div>
                    <h1>Hola ${user.first_name} ${user.last_name}</h1>
                    <p style="font-family: 'Times New Roman', Times, serif; font-size: 16px;">Introduce este código para restablecer tu contraseña</p>
                    <h2>${code}</h2>
                    <p style="font-family: 'Times New Roman', Times, serif; font-size: 16px;">Si no has solicitado este PIN, te recomendamos cambiar tu contraseña de LinkedIn.

                    Ajustes y privacidad > Inicio de sesión y seguridad > Cambiar contraseña
                    
                    Si quieres proteger aún más tu cuenta, también puedes:
                    
                    Activar la verificación en dos pasos
                    
                    Ajustes y privacidad > Inicio de sesión y seguridad > Verificación en dos pasos
                    
                    Comprobar dónde tienes activa tu sesión
                    
                    Ajustes y privacidad > Inicio de sesión y seguridad > Dónde tienes activa tu sesión
                    
                    Gracias por ayudarnos a mantener tu cuenta segura.
                    
                    El equipo de LinkedIn</p>
                </div>
            `
    }

    transport.sendMail(mailParms, (error) => {
        if(error) return res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
        res.status(200).send({message: `Se envío un correo electrónico a ${email}`})
    })
})

router.post("/request-password-reset/checkpoint", async (req,res)=>{
    const {code} = req.body
    if(!code) return res.status(400).send({message: "Completa este campo"})

    const token = req.cookies[PASSWORD_COOKIE]

    if(!token) return res.status(419).send({message: "Sesión caducada"})

    const decodedData = jwt.verify(token, SECRET_KEY);

    if(code !== decodedData.code) return  res.status(400).send({message: "Código incorrecto"})

    res.status(200).send({auth: true});
})

router.put("/reset-password", async (req, res) => {
    const {password, confirmPassword} = req.body

    for(let key in req.body){
        if (!req.body[key]) {
            return res.status(400).send({message: "Completa este campo"})
            break;
        }
    }

    const isSafePassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
    if(!isSafePassword) return res.status(400).send({message: "La contraseña debe contener al menos: 8 caracteres, una mayusucula, una minusucula, un numero y un caracter especial (@, #, $, etc)"})


    if(password !== confirmPassword) return res.status(400).send({message: "Las contraseñas no coinciden"})

    const token = req.cookies[PASSWORD_COOKIE]
    if(!token) return res.status(419).send({message: "Sesión caducada"})

    const decodedData = jwt.verify(token, SECRET_KEY);

    const user = decodedData.user
    user.password = createHash(password)

    try {
        await UsersModel.updateOne({_id: user._id}, user)
        res.status(200).send({message: "Se cambió la contraseña con exito"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

export default router