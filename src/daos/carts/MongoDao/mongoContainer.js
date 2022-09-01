import mongoose from "mongoose";

export default class MongoDBContainer {
    constructor(collection, schema) {
        mongoose.connect('mongodb+srv://santiagofalco:123asd@clustercursocoder.guulqh2.mongodb.net/atlasdb?retryWrites=true&w=majority', err => {
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
        return result
    }

    save = async (document) => {
        let result = await this.model.create(document)
        return result
    }

    update = async (id, data) => {
        await this.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    products: data.products
                },
            }
        );
        return { status: "OK" };

    }

    deleteAll = async (document) => {
        let result = await this.model.deleteAll(document)
        return result
    }

    deleteById = async (id) => {
        let result = await this.model.findByIdAndRemove(id)
        return result
    }
}

