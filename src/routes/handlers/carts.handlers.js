import { logger } from '../../utils/logger.js'

export class CartsHandler {
    constructor(service, mailService, userService, productService) {
        this.service = service
        this.mailService = mailService
        this.userService = userService
        this.productService = productService
    }

    getCart = async (req, res) => {
        const products = await this.service.getById(req.params.cid)
        if (!products) {
            logger.info('products:', [])
            res.status(404).json([])
        } else {
            res.status(200).json(products)
        }
    }

    createCart = async (req, res) => {
        const id = await this.service.create(req.body.products)
        res.status(200).json({ id })
    }

    appendProductToCart = async (req, res) => {
        try {
            let id = req.params.cid
            await this.service.addProductToCart(id, req.body)
            res.status(200).send(req.body)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send(error.message)
        }
    }

    deleteCart = async (req, res) => {
        try {
            let id = req.params.cid
            await this.service.deleteCartById(id)
            res.status(200).send()
        } catch (error) {
            logger.error('Error 500: Falló al eliminar')
            res.status(500).send('Falló al eliminar')
        }
    }

    deleteCartProduct = async (req, res) => {
        try {
            let id = req.params.cid
            let pid = req.params.pid
            await this.service.deleteCartProduct(id, pid)
            res.status(200).send()
        } catch (error) {
            logger.error('Falló al eliminar')
            res.status(500).send('Error 500: Falló al eliminar')
        }
    }


    finishCart = async (req, res) => {
        try {
            const { email, id, currentCartId } = req.session.user
            let cart = await this.service.getById(currentCartId)
            let detail = ""
            for (const element of cart.products) {
                const product = await this.productService.getById(element.product)
                detail += `  ${product.name} x ${element.quantity}  `
            }
            let result = await this.mailService.sendSimpleMail({
                from: 'ProyectoEcommerce',
                to: email,
                subject: 'Confirmación de finalizacion simulación de compra',
                html: `<div><p>Usted ha simulado la compra de:<br/> ${detail}</p></div>`
            })
            await this.userService.updateCurrentCartUser(id, null)
            await this.service.deleteCartById(currentCartId)
            req.session.user.currentCartId = null
            res.status(200).send()
        } catch (error) {
            logger.error('error en finishCart', error)
            res.status(500).send('Falló al finalizar la compra')
        }
    }

} 