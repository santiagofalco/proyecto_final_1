import mongoose from "mongoose";
import MongoDBContainer from "./mongoContainer.js";

const collection = 'carts'
const cartsSchema = mongoose.Schema({
    timestamp: Number,
    products: [{
        product: String,
        quantity: Number
    }]
})

export default class Products extends MongoDBContainer {
    constructor() {
        super(collection, cartsSchema) 
    }
}
