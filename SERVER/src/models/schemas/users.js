import mongoose from "mongoose";

const UsersCollection = "users"

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        requierd: true
    },
    last_name: {
        type: String,
        requierd: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requierd: true
    },
    phone: {
        type: Number,
        requierd: true

    },
    role: {
        type: String,
        enum: ["BASIC", "ADMIN", "PREMIUM"],
        default: "BASIC"
    },
    cart: {},
    addresses: [],
    purchases: [],
    last_connection: {
        type: Date,
        default: ""
    }

})

const UsersModel = mongoose.model(UsersCollection, UserSchema)
export default UsersModel