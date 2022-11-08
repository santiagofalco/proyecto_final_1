import { Router } from 'express'
import { getCartPersistance } from '../daos/carts/index.js'
import { getProductPersistance } from '../daos/products/index.js'
import CartService from '../services/cart.service.js'
import ProductService from '../services/product.service.js'
import userPersistance from '../daos/users/MongoDao/users.js'
import UserService from '../services/user.service.js'
import { UserCartHandler } from './handlers/userCart.handlers.js'


const router = Router()

const productPersistance = await getProductPersistance()
const cartPersistance = await getCartPersistance()

const productService = new ProductService(productPersistance)
const userService = new UserService(userPersistance)
const cartService = new CartService(cartPersistance, productPersistance)
const cartHandler = new UserCartHandler(cartService, productService, userService)

router.get('/', cartHandler.getViewUserCart)

export default router
