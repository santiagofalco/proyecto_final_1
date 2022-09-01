import fs from 'fs'

class CartService {

    constructor(persistance, productPersistance) {
        this.persistance = persistance
        this.productPersistance = productPersistance
    }

    _isProductValid = async (id, stock) => {
        let product = await this.productPersistance.getById(id)
        console.log(product)
        if (!product) {
            return false
        }
        if (product.stock < stock) {
            return false
        }
        return true
    }

    _updateStock = async (id, stock) => {
        let product = await this.productPersistance.getById(id)
        console.log('producto',product)
        product.stock -= stock
        await this.productPersistance.updateStock(id, product)
    }

    getAll = async () => {
        return await this.persistance.getAll()
    }

    create = async (products) => {
        try {
            let cart = {}
            cart.timestamp = Date.now()
            cart.products = products === undefined ? [] : products

            cart = await this.persistance.save(cart)
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
            let carrito = await this.persistance.getById(id)

            if (!carrito) {
                throw new Error('carrito no existe')
            }
            console.log(item)
            console.log(carrito)
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
            await this.persistance.update(id, carrito)
            this._updateStock(item.product, item.quantity)
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }



    put = async (id, data) => {
        try {
            await this.persistance.update(id, data)
        } catch (err) {
            console.error('Error' + err)
        }

    }


    getById = async (id) => {
        try {
            return await this.persistance.getById(id)
        } catch (err) {
            console.error('Error' + err)
        }
    }

    deleteCartById = async (id) => {
        try {
            return await this.persistance.deleteById(id)
        } catch (err) {
            console.error('Error' + err)
            throw err
        }

    }


    deleteCartProduct = async (id, pid) => {
        console.log(pid)
        try {
            let carrito = await this.persistance.getById(id)
            console.log(carrito)
            if (!carrito) {
                throw new Error('carrito no existe')
            }
            let productIdx = carrito.products.findIndex(e => {
                return e.product === pid
            })
            if (productIdx === -1) {
                throw new Error('producto no existe')
            }
            let [removedProduct] = carrito.products.splice(productIdx, 1)
            await this.persistance.update(id, carrito)
            await this._updateStock(pid, removedProduct.quantity * -1)
        } catch (error) {
            console.error('Error' + error)
            throw error
        }

    }

}

export default CartService