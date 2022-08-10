import fs from 'fs'

class ProductService {

    constructor(fileName) {
        this.fileName = fileName
    }

    getAll = async () => {
        try {
            if (fs.existsSync(this.fileName)) {
                let fileData = await fs.promises.readFile(this.fileName, 'utf-8')
                let products = JSON.parse(fileData)
                return products
            } else {
                return [] //No hay products, devuelvo array vacio
            }

        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }

    _isValidCode = async (code, id) => {
        let products = await this.getAll()
        let productIdx = products.findIndex((e) => {
            return e.code === code && e.id !== id
        })

        if (productIdx === -1) {
            return true
        }
        return false
    }

    getById = async (id) => {
        try {
            if (fs.existsSync(this.fileName)) {
                let fileData = await fs.promises.readFile(this.fileName, 'utf-8')
                let product = JSON.parse(fileData)

                let foundProduct = product.find((e) => {
                    return e.id === id
                })
                if (!foundProduct) {
                    return null
                }
                return foundProduct
            } else {
                console.log('No existe')
                return null
            }
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }


    addProduct = async (product) => {
        try {
            if (product.code && !(await this._isValidCode(product.code, undefined))) {
                console.log('codigo invalido')
                throw new Error('Codigo invalido')
            }
            let products = await this.getAll()
            if (products.length === 0) { //No existe o vacio
                product.id = 1
            } else { // mas de un producto
                product.id = products[products.length - 1].id + 1
            }
            product.timestamp = Date.now()
            products.push(product)
            await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, '\t'))
            return product.id
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }

    updateProduct = async (id, newValues) => {
        try {
            if (newValues.code && !(await this._isValidCode(newValues.code, id))) {
                console.log('codigo invalido')
                throw new Error('Codigo invalido')
            }
            let products = await this.getAll()
            let oldProductIndex = products.findIndex((e) => {
                return e.id === parseInt(id)
            })
            if (oldProductIndex === -1) {
                throw new Error('No hay producto con ese valor ingresado')
            }
            let productoActualizar = products[oldProductIndex]
            productoActualizar = { ...productoActualizar, ...newValues }
            products[oldProductIndex] = productoActualizar
            await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, '\t'))
        } catch (error) {
            console.error('Error' + error)
            throw error
        }
    }

    deleteProductById = async (id) => {
        try {
            let products = await this.getAll()
            if (products.length != 0) { //Si no esta vacio

                let foundProduct = products.find((e) => {
                    return e.id === id
                })

                if (!foundProduct) {
                    return null
                }
                products.splice(foundProduct-1, 1)
                await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, '\t'))
            } else { // está vacio 
                console.log('el array esta vacio')
            }

        } catch (err) {
            console.error('Error' + err)
        }

    }

}

export default ProductService