import { errCodigoInvalido } from "../../services/product.service.js"
import {logger} from '../../utils/logger.js'

export class ProductHandler {
    constructor(service) {
        this.service = service
    }

    getAllProducts = async (req, res) => {
        const products = await this.service.getAll()
        if (!products) {
            logger.info('products:', [])
            res.status(404).json([])
        } else {
            res.status(200).json(products)
        }
    }

    getProductById = async (req, res) => {
        let id = req.params.pid
        const product = await this.service.getById(id)
        if (!product) {
            logger.info('product:', {})
            res.status(404).json({})
        } else {
            res.status(200).json(product)
        }
    }

    addProductToList = async (req, res) => {
        let product
        try {
            product = await this.service.addProduct(req.body)
        } catch (error) {
            if(error == errCodigoInvalido) {
                logger.info('Invalid Code')
                res.status(409).send('Invalid Code')
                return
            }
            logger.error('Error 500: Something went wrong')
            res.status(500).send('Something went wrong')
            return
        }
        logger.info(product)
        res.status(200).json(product)
    }

    updateProduct = async (req, res) => {
        try {
            let id = req.params.pid
            await this.service.updateProduct(id, req.body)
        } catch (error) {
            logger.error('Error 500: Something went wrong', error)
            res.status(500).send('Something went wrong')
            return
        }
        res.status(200).send()
    }

    deleteProductById = async (req, res) => {
        try {
            let id = req.params.pid
            await this.service.deleteProductById(id)
        } catch (error) {
            logger.error('Error 500: Something went wrong')
            res.status(500).send('Failed to delete')
            return
        }
        res.status(200).send()
    }

} 