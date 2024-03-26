import { Router } from "express"
import CartsModel from "../models/schemas/carts.js"
import passportControl from "../middlewares/passport-control.middleware.js"
import updateUser from "../utils/updateUser.js"

const router = Router()

router.get("/", passportControl("jwt"), async (req, res) => {
    const cart = await CartsModel.findOne({_id: req.user.cart._id}).populate("productsInCart.product").lean(true)

    cart?
    res.status(200).send(cart.productsInCart)
    :
    res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
})

router.post("/", async (req, res) => {
    const cart = {
        products: []
    }

    try {
        const result = await CartsModel.create(cart)
        res.status(201).send({payload: result, message: "Se creó el carrito correctamente"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

router.put("/products", passportControl("jwt"), async (req, res) => {
    const {id, quantity} = req.body

    const cart = await CartsModel.findOne({_id: req.user.cart._id})
    
    const productIndex = cart.productsInCart.findIndex(product => product.product._id == id)

    if(productIndex == -1){
        cart.productsInCart.push({product: {_id: id}, quantity})
    }else{
        cart.productsInCart[productIndex].quantity += quantity
    }

    try {
        await CartsModel.updateOne({_id: req.user.cart._id}, cart)
        updateUser(res, req.user, "cart", cart)
        res.status(200).send({message: "Se agregó el producto al carrito"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

router.put("/products/:pid", passportControl("jwt"), async (req, res) => {
    const pid = req.params.pid
    const {operation} = req.body

    const cart = await CartsModel.findOne({_id: req.user.cart._id})

    const productIndex = cart.productsInCart.findIndex(p => p.product._id == pid)

    if(operation === "+"){
        cart.productsInCart[productIndex].quantity++
    }else{
        cart.productsInCart[productIndex].quantity--
    }

    try {
        await CartsModel.updateOne({_id: req.user.cart._id}, cart)
        updateUser(res, req.user, "cart", cart)
        res.status(200).send({message: "Se actualizó la cantidad del producto en el carrito", payload: cart.productsInCart[productIndex].quantity})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }

})

router.delete("/products", passportControl("jwt"), async (req, res) => {
    const cart = await CartsModel.findOne({_id: req.user.cart._id})
    cart.productsInCart = []

    try {
        await CartsModel.updateOne({_id: cart.id }, cart);
        updateUser(res, req.user, "cart", cart)
        res.status(200).send({message: "Se eliminaron todos los productos del carrito"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})


router.delete("/products/:pid", passportControl("jwt"),async (req, res) => {
    const pid = req.params.pid

    const cart = await CartsModel.findOne({_id: req.user.cart._id})

    const index = cart.productsInCart.indexOf(p => p.product._id === pid)
    cart.productsInCart.splice(index, 1)

    try {
        await CartsModel.updateOne({_id: cart.id }, cart);
        updateUser(res, req.user, "cart", cart)
        res.status(200).send({message: "Se eliminaron el producto del carrito"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }

})

export default router