import fs from 'fs'
// import ProductService from './product.service'

class CartService {

    constructor(fileName, productFileName = 'products.json') {
        this.fileName = fileName
        this.productFileName = productFileName
    }

    _readFromFile = async (fileName) => {
        try {
            if (fs.existsSync(fileName)) {
                let fileData = await fs.promises.readFile(fileName, 'utf-8')
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

    _isProductValid = async (id, stock) => {
        let products = await this._readFromFile(this.productFileName)
        let product = products.find((e) => {
            return id === e.id
        })
        if (!product) {
            return false
        }
        if (product.stock < stock) {
            return false
        }
        return true
    }

    _updateStock = async (id, stock) => {
        let products = await this._readFromFile(this.productFileName)
        let productIdx = products.findIndex((e) => {
            return id === e.id
        })
        let product = products[productIdx]
        product.stock -= stock
        products[productIdx] = product
        await fs.promises.writeFile(this.productFileName, JSON.stringify(products, null, '\t'))
    }


    _getProductById = async (id) => {
        let products = await this._readFromFile(this.productFileName)
        let product = products.find((e) => {
            return e.id === id
        })
        return product
    }

    getAll = async () => {
        return await this._readFromFile(this.fileName)
    }

    create = async (products) => {
        try {
            let carts = await this.getAll()
            let cart = {}
            if (carts.length === 0) { //No existe o vacio
                cart.id = 1
            } else { // mas de un carrito
                cart.id = carts[carts.length - 1].id + 1
            }
            cart.timestamp = Date.now()
            cart.products = products === undefined ? [] : products
            carts.push(cart)
            await fs.promises.writeFile(this.fileName, JSON.stringify(carts, null, '\t'))
            return cart.id
        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }


    addProductToCart = async (id, item) => {
        try {
            if (! await this._isProductValid(item.product, item.quantity)) {
                console.error('producto no valido')
                throw new Error('Producto inexistente o insuficiente')
            }
            let carts = await this.getAll()
            let carritoIdx = carts.findIndex((e) => {
                return e.id === id
            })
            if (carritoIdx === -1) {
                throw new Error('carrito no encontrado')
            }
            let carrito = carts[carritoIdx]
            let productIdx = carrito.products.findIndex((e) => {
                return e.product === item.product
            })

            if (productIdx === -1) {
                carrito.products = [...carrito.products, item]
            } else {
                carrito.products = carrito.products.map((e) => {
                    if (e.product === item.product) {
                        return { ...e, quantity: e.quantity + item.quantity }
                    }
                    return e
                })
            }

            carts[carritoIdx] = carrito
            await fs.promises.writeFile(this.fileName, JSON.stringify(carts, null, '\t'))
            this._updateStock(item.product, item.quantity)
        } catch (err) {
            console.error('Error' + err)
            throw new Error(err)
        }
    }



    put = async (id) => {
        try {
            if (fs.existsSync(this.fileName)) {
                let fileData = await fs.promises.readFile(this.fileName, 'utf-8')
                let carts = JSON.parse(fileData)
                // return cart[id - 1]

                let oldCartIndex = carts.findIndex((e) => {
                    return e.id === parseInt(id)
                })

                if (oldCartIndex === -1) {
                    throw new Error('No hay carrito con ese valor ingresado')
                }
                let oldCart = carts[oldCartIndex]
                let newCart = { ...oldCart }
                carts[oldCartIndex] = newCart


            } else {
                console.log('No existe')
                return null //No hay carrito, devuelvo array vacio
            }

        } catch (err) {
            console.error('Error' + err)
        }

    }


    getById = async (id) => {
        try {
            if (fs.existsSync(this.fileName)) {
                let fileData = await fs.promises.readFile(this.fileName, 'utf-8')
                let carts = JSON.parse(fileData)
                let cartIndex = carts.findIndex((e) => {
                    return e.id === parseInt(id)
                })


                if (cartIndex === -1) {
                    console.log('No hay carrito con ese valor ingresado')
                    return null
                }

                let response = await Promise.all(carts[cartIndex].products.map(async (e) => {
                    let product = await this._getProductById(e.product)
                    return { ...product, quantity: e.quantity, }
                }))
                return response
            } else {
                console.log('No existe')
                return null //No hay carritos, devuelvo array vacio
            }
        } catch (err) {
            console.error('Error' + err)
        }
    }

    deleteCartById = async (id) => {
        try {
            let carts = await this.getAll()
            if (carts.length != 0) { //Si no esta vacio
                let cartToDelete = carts.find((e) => {
                    return e.id === parseInt(id)
                })
                if (cartToDelete === -1) {
                    throw new Error('carrito no encontrado')
                }


                carts.splice(cartToDelete - 1, 1)
                await fs.promises.writeFile(this.fileName, JSON.stringify(carts, null, '\t'))
            } else { // está vacio 
                console.log('el array esta vacio')
            }

        } catch (err) {
            console.error('Error' + err)
            throw err
        }

    }


    deleteCartProduct = async (id, pid) => {
        try {
            let carts = await this.getAll()
            let carritoIdx = carts.findIndex((e) => {
                return e.id === id
            })
            if (carritoIdx === -1) {
                throw new Error('carrito no encontrado')
            }
            let carrito = carts[carritoIdx]
            let productIdx = carrito.products.findIndex((e) => {
                return e.product === pid
            })
            if (productIdx === -1) {
                throw new Error('No existe el producto en el carrito')
            }
            let stock = carrito.products[productIdx].quantity
            carrito.products.splice(productIdx, 1)
            carts[carritoIdx] = carrito
            await fs.promises.writeFile(this.fileName, JSON.stringify(carts, null, '\t'))
            await this._updateStock(pid, stock * -1)
        } catch (error) {
            console.error('Error' + error)
            throw error
        }

    }

}

export default CartService