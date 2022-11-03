import {logger} from '../../utils/logger.js'

export class CartsHandler {
    constructor(service, mailService, userService) {
        this.service = service
        this.mailService = mailService
        this.userService = userService
    }

    getCart = async (req, res) => {
        const productos = await this.service.getById(req.params.cid)
        if (!productos) {
            logger.info('productos:', [])
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
            let id = req.params.cid
            await this.service.addProductToCart(id, req.body)
        } catch (error) {
            logger.error(error.message)
            res.status(500).send(error.message)
        }
        res.status(200).send()
    }

    deleteCart = async (req, res) => {
        try {
            let id = req.params.cid
            await this.service.deleteCartById(id)
        } catch (error) {
            logger.error('Error 500: Falló al eliminar')
            res.status(500).send('Falló al eliminar')
        }
        res.status(200).send()
    }

    deleteCartProduct = async (req, res) => {
        try {
            
            let id = req.params.cid
            let pid = req.params.pid
            await this.service.deleteCartProduct(id, pid)
        } catch (error) {
            logger.error('Falló al eliminar')
            res.status(500).send('Error 500: Falló al eliminar')
        }
        res.status(200).send()
    }


    finishCart = async (req, res) => {
        try {
            const {email, id, currentCartId} = req.session.user
            let result = await this.mailService.sendSimpleMail({
                from: 'ProyectoEcommerce',
                to: email,
                subject: 'Confirmación de finalizacion simulación de compra',
            })
            await this.service.deleteCartById(currentCartId)
            await this.userService.updateCurrentCartUser(id, null)
            req.session.user.currentCartId = null
            res.status(200).send()
        }catch (error) {
            logger.error('error en finishCart', error)
            res.status(500).send('Falló al finalizar la compra')
        }
        res.status(200).send()
    }

} 