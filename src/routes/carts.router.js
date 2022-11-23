import {Router} from 'express';
import CartService from '../services/cart.service.js';
import MailService from '../services/mailer.service.js';
import ProductService from '../services/product.service.js';
import UserService from '../services/user.service.js'
import { CartsHandler } from './handlers/carts.handlers.js';
import { getCartPersistance } from '../daos/carts/factory.js';
import { getProductPersistance } from '../daos/products/factory.js';
import userPersistance from '../daos/users/MongoDao/users.js'

const router = Router()
 
const cartPersistance = await getCartPersistance()
const productPersistance = await getProductPersistance() 

const service = new CartService(cartPersistance, productPersistance)
const productService = new ProductService(productPersistance)
const mailService = new MailService()
const userService = new UserService(userPersistance)
const handler = new CartsHandler(service, mailService, userService, productService) 

router.post("/", handler.createCart);

router.get("/:cid/products", handler.getCart)

router.post("/:cid/products", handler.appendProductToCart);

router.post("/:cid/finish", handler.finishCart);

router.delete("/:cid", handler.deleteCart);

router.delete("/:cid/products/:pid", handler.deleteCartProduct);

export default router