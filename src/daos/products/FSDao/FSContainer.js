import fs from 'fs'
import { randomUUID } from "crypto"

export default class FSContainer {
    constructor(fileName) {
        this.fileName = fileName
    }

    _readFromFile = async () => {
        try {
            if (fs.existsSync(this.fileName)) {
                let fileData = await fs.promises.readFile(this.fileName, 'utf-8')
                let result = JSON.parse(fileData)
                return result
            } else {
                return []
            }

        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }

    _writeToFile = async (element) => {
        let data = await this._readFromFile()
        data.push(element)
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, '\t'))
    }

    _reWriteToFile = async (data) => {
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, '\t'))
    }

    _truncateFile = async () => {
        await fs.promises.writeFile(this.fileName, JSON.stringify([], null, '\t'))
    }


    getAll = async () => {
        let data = await this._readFromFile()
        return data
    }

    getById = async (id) => {
        let data = await this.getAll()
        let found = data.find(e => {
            return e.id === id
        })
        return found
    }

    save = async (element) => { 
        element.id = randomUUID() 
        await this._writeToFile(element)
        return element
    }

    update = async (id, newValues) => {
        let elements = await this.getAll()
        let foundIdx = elements.findIndex(e => {
            return e.id === id
        })
        let elementToUpdate = elements[foundIdx]
        elementToUpdate = { ...elementToUpdate, ...newValues }
        elements[foundIdx] = elementToUpdate
        await this._reWriteToFile(elements)
    }

    deleteById = async (id) => {
        let elements = await this.getAll()
        let foundIdx = elements.findIndex(e => {
            return e.id === id
        })
        elements.splice(foundIdx, 1)
        await this._reWriteToFile(elements)

    }
 
    deleteAll = async () => {
        await this._truncateFile()
    }


    updateStock = async (id, product) => {
        let products = await this.getAll()
        let foundIdx = products.findIndex(e => {
            return e.id === id
        }) 
        if (foundIdx === -1){
            throw new Error('Producto no encontrado')
        }
        products[foundIdx].stock = product.stock
        await this._reWriteToFile(products)
    }


}