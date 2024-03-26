import mongoose from "mongoose";

const CartsCollection = "carts"

const CartSchema = new mongoose.Schema({
    productsInCart: {
        type: [
            {
                quantity: Number,
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        required: true,
        default: []
    }
})

const CartsModel = mongoose.model(CartsCollection, CartSchema)
export default CartsModel