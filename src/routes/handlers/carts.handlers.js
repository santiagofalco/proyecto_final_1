export class CartsHandler {
    constructor(service) {
        this.service = service
    }

    getCart = async (req, res) => {
        const productos = await this.service.getById(req.params.cid)
        if (!productos) {
            res.status(404).json([])
        } else {
            res.status(200).json(productos)
        }
    }

    createCart = async (req, res) => {
        const id = await this.service.create(req.body.products)
        res.status(200).json({ id })
    }

    appendProductToCart = async (req, res) => {
        try {
            if (isNaN(parseInt(req.params.cid))) {
                res.status(400).send('id invalido')
            }
            let id = parseInt(req.params.cid)
            await this.service.addProductToCart(id, req.body)
        } catch (error) {
            res.status(500).send('Algo falló')
        }
        res.status(200).send()
    }

    deleteCart = async (req, res) => {
        try {
            if (isNaN(parseInt(req.params.cid))) {
                res.status(400).send('id invalido')
            }
            let id = parseInt(req.params.cid)
            await this.service.deleteCartById(id)
        } catch (error) {
            res.status(500).send('Falló al eliminar')
        }
        res.status(200).send()
    }

    deleteCartProduct = async (req, res) => {
        try {
            if (isNaN(parseInt(req.params.cid))) {
                res.status(400).send('id de carrito invalido')
            }
            if (isNaN(parseInt(req.params.pid))) {
                res.status(400).send('id de producto invalido')
            }
            let id = parseInt(req.params.cid)
            let pid = parseInt(req.params.pid)
            await this.service.deleteCartProduct(id, pid)
        } catch (error) {
            res.status(500).send('Falló al eliminar')
        }
        res.status(200).send()
    }

} 