import { Router } from 'express'
import { getCartPersistance } from '../daos/carts/index.js'
import { getProductPersistance } from '../daos/products/index.js'
import CartService from '../services/cart.service.js'
import ProductService from '../services/product.service.js'
import userPersistance from '../daos/users/MongoDao/users.js'
import UserService from '../services/user.service.js'


const router = Router()

class UserCartHandler {
    constructor(cartService, productService, userService) {
        this.cartService = cartService,
            this.productService = productService
        this.userService = userService
    }
    getViewUserCart = async (req, res) => {
        let user = req.session.user
        let currentCartId = user.currentCartId
        let cart = await this.cartService.getById(currentCartId)
        if (cart === null) {
            currentCartId = await this.cartService.create()
            this.userService.updateCurrentCartUser(user.id, currentCartId)
            cart = await this.cartService.getById(currentCartId)
            req.session.user.currentCartId = currentCartId
        }
        const cartToRender = []
        for (const element of cart.products) {
            const product = await this.productService.getById(element.product)
            cartToRender.push({ id: product.id, name: product.name, price: product.price, thumbnail: product.thumbnail, quantity: element.quantity })
        }
        res.render('cart.pug', {
            message: 'Carrito',
            cart: cartToRender,
            currentCartId,
            userId: user.id
        })
    }
}

const productPersistance = await getProductPersistance()
const cartPersistance = await getCartPersistance()

const productService = new ProductService(productPersistance)
const userService = new UserService(userPersistance)
const cartService = new CartService(cartPersistance, productPersistance)
const cartHandler = new UserCartHandler(cartService, productService, userService)

router.get('/', cartHandler.getViewUserCart)

export default router
