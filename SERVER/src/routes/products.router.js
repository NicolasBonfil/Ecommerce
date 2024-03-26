import { Router } from "express"
import ProductsModel from "../models/schemas/products.js"
import { fakerES as faker } from '@faker-js/faker';
import { uploader } from "../utils/multer.js";
import fs from "fs"

const router = Router()

router.delete("/delete-image/:imgId", (req, res) => {
    const imageName = req.params.imgId
    
    fs.unlink(`./src/public/products/images/${imageName}`, (error) => {
        if (error) {
            res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
            return;
        }
        res.status(200).send({message: "Se elminó la imagen correctamente"})
    });

})


router.post("/upload-image", uploader.single("image"), (req, res) => {
    req.file?
    res.status(200).send({message: "Se envió la imagen correctamente"})
    :
    res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})

})

router.get("/", async (req, res) => {
    try {
        const products = await ProductsModel.find()

        products.map(p => p.status === true)

        res.status(200).json(products)  
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})


router.get("/:pid", async (req, res) => {
    const pid = req.params.pid
    try {
        const product = await ProductsModel.findById(pid)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

router.post("/", async (req, res) => {
    let {title, description, price, stock, category, brand, images} = req.body

    price = price.replace(/\./g, '')
    stock = stock.replace(/\./g, '')

    for(let key in req.body){
        if (!req.body[key] || req.body[key].length  < 1) {
            return res.status(400).send({message: "Completa este campo"})
            break;
        }
    }

    if(parseInt(price)  <= 0 || isNaN(price)) return res.status(400).send({message :"El precio debe ser un numero mayor a 0"})

    let code;
    let productExists;

    do {
        code = faker.string.alphanumeric(6)
        productExists = await ProductsModel.findOne({code: code})
    } while (productExists);

    const product = {
        title,
        description,
        price: parseInt(price),
        stock: parseInt(stock),
        category,
        code: code,
        brand,
        images
    }

    try {
        await ProductsModel.create(product)
        res.status(201).send({message: "Producto añadido"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

router.put("/:pid", async (req, res) => {
    const pid = req.params.pid
    const updatedProductData = req.body

    let {title, description, price, stock, category} = updatedProductData

    updatedProductData.price = price.replace(/\./g, '')
    updatedProductData.stock = stock.replace(/\./g, '')

    if(!title || !description || !price || !stock || !category ) return res.status(400).send({message: "Debes completar todos los campos"})

    if(parseInt(stock)  <= 0 || isNaN(stock)) return res.status(400).send({message :"El stock debe ser un numero mayor a 0"})
    if(parseInt(price)  <= 0 || isNaN(price)) return res.status(400).send({message :"El precio debe ser un numero mayor a 0"})

    const product = await ProductsModel.findById(pid)

    const keys = Object.keys(updatedProductData)
    const values = Object.values(updatedProductData)

    
    for(let i = 0; i < keys.length; i++){
        let llave = keys[i]
        let valor = values[i]
        product[llave] = valor
    }

    try {
        await ProductsModel.updateOne({_id: pid}, product);
        res.status(200).send({message: "Producto actualizado"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid
    try {
        await ProductsModel.deleteOne({_id: pid})
        res.status(200).send({message: "Producto eliminado"})
    } catch (error) {
        res.status(500).send({message: "Ocurrió un error. Intentelo de nuevo."})
    }
})

export default router