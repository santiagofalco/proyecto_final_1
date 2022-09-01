import { randomUUID } from "crypto"

export default class MemoryContainer {
    constructor() {
        this.data = []
    }

    getAll = () => {
        return this.data
    }

    getById = (id) => {
        let found = this.data.find(e => {
            return e.id === id
        })
        return found
    }

    save = (element) => {
        element.id = randomUUID()
        this.data.push(element)
        return element
    }

    update = async (id) => {
        let foundIndex = this.data.findIndex(e => {
            return e.id === id
        })
        if (foundIndex === -1) {
            return undefined
        }
        let elementToUpdate = this.data[foundIndex]
        let updatedElement = { ...elementToUpdate }
        this.data[foundIndex] = updatedElement
    }

    deleteAll = () => {
        this.data = []
    }

    deleteById = (id) => {
        let foundIndex = this.data.findIndex(e => {
            return e.id === id
        })
        this.data.splice(foundIndex, 1)
    }
}