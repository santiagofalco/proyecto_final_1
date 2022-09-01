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
        let elements = await this._readFromFile()
        return elements
    }

    getById = async (id) => {
        let elements = await this.getAll()
        let found = elements.find(e => {
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
        console.log(elements)
        let found = elements.findIndex(e => {
            return e.id === id
        })
        let elementToUpdate = elements[found]
        let updatedElement = { ...elementToUpdate, ...newValues }
        elements[found] = updatedElement
        await this._reWriteToFile(elements)
    }

    deleteById = async (id) => {
        let elements = await this.getAll()
        let found = elements.findIndex(e => {
            return e.id === id
        })
        elements.splice(found, 1)
        await this._reWriteToFile(elements)

    }

    deleteAll = async () => {
        await this._truncateFile()
    }


}
