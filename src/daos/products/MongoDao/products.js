import mongoose from "mongoose";
import MongoDBContainer from "./mongoContainer.js";

const collection = 'products'
const productsSchema = mongoose.Schema({
    name: String,
    description: String,
    code: String,
    thumbnail: String,
    price: Number,
    stock: Number,
    timestamp: Number
})

export default class Products extends MongoDBContainer {
    constructor() {
        super(collection, productsSchema) 
    }
}
