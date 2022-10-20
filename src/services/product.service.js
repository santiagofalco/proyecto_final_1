
export const errCodigoInvalido = new Error('Codigo invalido')
import {logger} from '../utils/logger.js'


class ProductService {

    constructor(persistance) {
        this.persistance = persistance
    }

    getAll = async () => {
        try {
           return await this.persistance.getAll()
        } catch (err) {
            logger.error('Error' + err)
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
            return await this.persistance.getById(id)
        } catch (err) {
            logger.error('Error' + err)
            throw err
        }
    }


    addProduct = async (product) => {
        try {
            if (product.code && !(await this._isValidCode(product.code, undefined))) {
                logger.warn('codigo invalido')
                throw errCodigoInvalido
            }
            product.timestamp = Date.now()
            const result = await this.persistance.save(product)
            return result
        } catch (err) {
            logger.error('Error' + err)
            throw err
        }
    }

    updateProduct = async (id, newValues) => {
        try {
            if (newValues.code && !(await this._isValidCode(newValues.code, id))) {
                logger.warn('codigo invalido')
                throw new Error('Codigo invalido')
            }
            await this.persistance.update(id, newValues)
        } catch (error) {
            logger.error('Error' + error)
            throw error
        }
    }

    deleteProductById = async (id) => {
        try {
           await this.persistance.deleteById(id)

        } catch (err) {
            logger.error('Error' + err)
        }

    }

}

export default ProductService