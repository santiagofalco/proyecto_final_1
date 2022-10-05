import mongoose from "mongoose";
import config from "../../../config/config.js";

export default class MongoDBContainer {
    constructor(collection, schema) {
        mongoose.connect(config.mongo.MONGO_URL, err => {
            if (err) {
                console.log(err)
            } else console.log('base conectada')
        })
        this.model = mongoose.model(collection, schema)
    }

    getAll = async () => {
        let result = await this.model.find()
        return result
    }

    getById = async (id) => {
        let result = await this.model.findById(id)
        console.log(result)
        return result
    }

    save = async (document) => {
        let result = await this.model.create(document)
        return result.toJSON()
    }

    update = async (id, data) => {
        await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: data.name,
                    description: data.description,
                    code: data.code,
                    thumbnail: data.thumbnail,
                    price: data.price,
                    stock: data.stock
                },
            }
        );
        return { status: "OK" };

    }

    updateStock = async (id, data) => {
        await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    stock: data.stock
                },
            }
        );
        return { status: "OK" };

    }

    deleteAll = async (document) => {
        let results = await this.model.deleteAll(document)
        return results
    }

    deleteById = async (id) => {
        let results = await this.model.findByIdAndRemove(id)
        return results
    }
}

