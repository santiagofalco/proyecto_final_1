import fs from 'fs'
import {logger} from '../utils/logger.js'

class CartService {

    constructor(persistance, productPersistance) {
        this.persistance = persistance
        this.productPersistance = productPersistance
    }

    _isProductValid = async (id, stock) => {
        let product = await this.productPersistance.getById(id)
        logger.info(product)
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
        logger.info('producto',product)
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
            logger.error('Error' + err)
            return null
        }
    }


    addProductToCart = async (id, item) => {
        try {
            if (! await this._isProductValid(item.product, item.quantity)) {
                // throw new Error('Producto inexistente o insuficiente')
                logger.info('not valid or insufficient product')
            }
            let cart = await this.persistance.getById(id)

            if (!cart) {
                logger.info('not valid or inexistent cart')
                // throw new Error('cart no existe')
            }
            logger.info(item)
            logger.info(cart)
            let productIdx = cart.products.findIndex((e) => {
                return e.product === item.product
            })
            if (productIdx === -1) {
                cart.products = [...cart.products, item]
            } else {
                cart.products = cart.products.map((e) => {
                    if (e.product === item.product) {
                        return { ...e, quantity: e.quantity + item.quantity }
                    }
                    return e
                })
            }
            await this.persistance.update(id, cart)
            this._updateStock(item.product, item.quantity)
        } catch (err) {
            logger.error('Error' + err)
            throw err
        }
    }



    put = async (id, data) => {
        try {
            await this.persistance.update(id, data)
        } catch (err) {
            logger.error('Error' + err)
            throw err
        }

    }


    getById = async (id) => {
        try {
            return await this.persistance.getById(id)
        } catch (err) {
            logger.error('Error' + err)
            throw err
        }
    }

    deleteCartById = async (id) => {
        try {
            return await this.persistance.deleteById(id)
        } catch (err) {
            logger.error('Error' + err)
            throw err
        }

    }


    deleteCartProduct = async (id, pid) => {
        logger.info(pid)
        try {
            let carrito = await this.persistance.getById(id)
            logger.info(carrito)
            if (!carrito) {
                logger.info('carrito no existe')
                // throw new Error('carrito no existe')
            }
            let productIdx = carrito.products.findIndex(e => {
                return e.product === pid
            })
            if (productIdx === -1) {
                logger.info('producto no existe')
                // throw new Error('producto no existe')
            }
            let [removedProduct] = carrito.products.splice(productIdx, 1)
            await this.persistance.update(id, carrito)
            await this._updateStock(pid, removedProduct.quantity * -1)
        } catch (error) {
            logger.error('Error' + error)
            // throw error
        }

    }

}

export default CartService