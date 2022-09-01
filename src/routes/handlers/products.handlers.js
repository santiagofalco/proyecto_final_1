import { errCodigoInvalido } from "../../services/product.service.js"

export class ProductHandler {
    constructor(service) {
        this.service = service
    }

    getAllProducts = async (req, res) => {
        const productos = await this.service.getAll()
        if (!productos) {
            res.status(404).json([])
        } else {
            res.status(200).json(productos)
        }
    }

    getProductById = async (req, res) => {
        let id = req.params.pid
        const producto = await this.service.getById(id)
        if (!producto) {
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
                res.status(409).send('Codigo Invalido')
                return
            }
            res.status(500).send('Algo falló')
            return
        }
        console.log(producto)
        res.status(200).json(producto)
    }

    updateProduct = async (req, res) => {
        try {
            let id = req.params.pid
            await this.service.updateProduct(id, req.body)
        } catch (error) {
            res.status(500).send('Algo falló')
        }
        res.status(200).send()
    }

    deleteProductById = async (req, res) => {
        try {
            let id = req.params.pid
            await this.service.deleteProductById(id)
        } catch (error) {
            res.status(500).send('Falló al eliminar')
        }
        res.status(200).send()
    }

} 