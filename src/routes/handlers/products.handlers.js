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
        let id = parseInt(req.params.pid)
        const productos = await this.service.getById(id)
        if (!productos) {
            res.status(404).json([])
        } else {
            res.status(200).json(productos)
        }
    }

    addProductToList = async (req, res) => {
        let producto
        try {
            producto = await this.service.addProduct(req.body)
        } catch (error) {
            res.status(500).send('Algo falló')
            return
        }

        res.status(200).json({ producto })
    }

    updateProduct = async (req, res) => {
        try {
            if (isNaN(parseInt(req.params.pid))) {
                res.status(400).send('id invalido')
            }
            let id = parseInt(req.params.pid)
            await this.service.updateProduct(id, req.body)
        } catch (error) {
            res.status(500).send('Algo falló')
        }
        res.status(200).send()
    }

    deleteProductById = async (req, res) => {
        try {
            if (isNaN(parseInt(req.params.pid))) {
                res.status(400).send('id invalido')
            }
            let id = parseInt(req.params.pid)
            await this.service.deleteProductById(id)
        } catch (error) {
            res.status(500).send('Falló al eliminar')
        }
        res.status(200).send()
    }

} 