import {Router} from 'express';
import ProductService from '../services/product.service.js';
import CartService from '../services/cart.service.js';
import { HomeHandler } from './handlers/home.handlers.js';
import authMiddleware from '../middlewares/authMiddleware.js'
import { getProductPersistance } from '../daos/products/index.js';
import { getCartPersistance } from '../daos/carts/index.js';
import UserService from '../services/user.service.js';

const router = Router()

const productPersistance = await getProductPersistance()


const service = new ProductService(productPersistance)
const cartService = new CartService(await getCartPersistance())
const userService = new UserService()
const handler = new HomeHandler(service, cartService, userService) 


router.get("/", handler.getHome);

export default router