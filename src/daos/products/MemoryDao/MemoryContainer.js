import { randomUUID } from "crypto"


export default class MemoryContainer {
    constructor() {
        this.data = []
    }

    getAll = async () => {
        return this.data
    }

    getById = async (id) => {
        let found = this.data.find(e => {
            return e.id === id
        })
        return found
    }

    save = async (element) => {
        element.id = randomUUID()
        this.data.push(element)
        return element
    }

    update = async (id, newValues) => {
        let foundIdx = this.data.findIndex(e => {
            return e.id === id
        })
        if(foundIdx === -1) {
            return undefined
        }
        let elementToUpdate = this.data[foundIdx]
        elementToUpdate = {...elementToUpdate, ...newValues}
        this.data[foundIdx] = elementToUpdate
        return elementToUpdate
        
    }

    deleteAll = async () => {
        this.data.splice(0, data.length)
    }

    deleteById = async (id) => {
        let found = this.data.findIndex(e => {
            return e.id === id
        })
        this.data.splice(found, 1)
    }

    updateStock = async (id, product) => {
        let foundIdx = this.data.findIndex(e => {
            return e.id === id
        }) 
        if (foundIdx === -1){
            throw new Error('Producto no encontrado')
        }
        this.data[foundIdx].stock = product.stock
    }
}