import mongoose from "mongoose";

const collection = 'users'
const usersSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    adress: String,
    age: String,
    number: Number,
    avatar: String,
    currentCartId: String,
    role: String
})

const userService = mongoose.model(collection, usersSchema)

export default userService