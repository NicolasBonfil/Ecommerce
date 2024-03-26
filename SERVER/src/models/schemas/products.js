import mongoose from "mongoose";

const ProductsCollection = "products"

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    },
    stock: {
        type: Number,
        required: true 
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    images: [],
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: String,
        required: true
    },

})

const ProductsModel = mongoose.model(ProductsCollection, ProductSchema)
export default ProductsModel