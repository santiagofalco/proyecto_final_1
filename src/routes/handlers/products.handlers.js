import { errCodigoInvalido } from "../../services/product.service.js"
import {logger} from '../../utils/logger.js'

export class ProductHandler {
    constructor(service) {
        this.service = service
    }

    getAllProducts = async (req, res) => {
        const productos = await this.service.getAll()
        if (!productos) {
            logger.info('productos:', [])
            res.status(404).json([])
        } else {
            res.status(200).json(productos)
        }
    }

    getProductById = async (req, res) => {
        let id = req.params.pid
        const producto = await this.service.getById(id)
        if (!producto) {
            logger.info('productos:', {})
            res.status(404).json({})
        } else {
            res.status(200).json(producto)
        }
    }

    addProductToList = async (req, res) => {
        let producto
        try {
            producto = await this.service.addProduct(req.body)
        } catch (error) {
            if(error == errCodigoInvalido) {
                logger.info('Codigo Invalido')
                res.status(409).send('Codigo Invalido')
                return
            }
            logger.error('Error 500: Algo falló')
            res.status(500).send('Algo falló')
            return
        }
        logger.info(producto)
        res.status(200).json(producto)
    }

    updateProduct = async (req, res) => {
        try {
            let id = req.params.pid
            await this.service.updateProduct(id, req.body)
        } catch (error) {
            logger.error('Error 500: Algo falló')
            res.status(500).send('Algo falló')
        }
        res.status(200).send()
    }

    deleteProductById = async (req, res) => {
        try {
            let id = req.params.pid
            await this.service.deleteProductById(id)
        } catch (error) {
            logger.error('Error 500: Algo falló')
            res.status(500).send('Falló al eliminar')
        }
        res.status(200).send()
    }

} 