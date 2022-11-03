// import { errCodigoInvalido } from "../../services/product.service.js"
import { logger } from '../../utils/logger.js'

export class HomeHandler {
    constructor(service, cartService, userService) {
        this.service = service
        this.cartService = cartService
        this.userService = userService
    }

    getHome = async (req, res) => {
        let productos = await this.service.getAll()
        let user = req.session.user
        if (user) {
            if (user.currentCartId === undefined || user.currentCartId === null) {
                user.currentCartId = await this.cartService.create()
                this.userService.updateCurrentCartUser(user.id, user.currentCartId)
            }
            if (user.role == 'ADMIN') {
                res.render('admin.pug', {
                    message: 'Lista de productos',
                    welcomeMessage: `Bienvenido/a administrador ${user.name}`,
                    avatar: user.avatar,
                    productos,
                    currentCartId: user.currentCartId

                })
            } else {
                res.render('home.pug', {
                    message: 'Lista de productos',
                    welcomeMessage: `Bienvenido/a ${user.name}`,
                    avatar: user.avatar,
                    productos,
                    currentCartId: user.currentCartId
                })
            }
        } else {
            res.redirect('/login')
        }
    }

} 