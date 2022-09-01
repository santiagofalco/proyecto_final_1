import {Router} from 'express';
import CartService from '../services/cart.service.js';
import { CartsHandler } from './handlers/carts.handlers.js';
import { getCartPersistance } from '../daos/carts/index.js';
import { getProductPersistance } from '../daos/products/index.js';

const router = Router()
 
const cartPersistance = await getCartPersistance()

const productPersistance = await getProductPersistance()

const service = new CartService(cartPersistance, productPersistance)
const handler = new CartsHandler(service) 

router.post("/", handler.createCart);

router.get("/:cid/products", handler.getCart)

router.post("/:cid/products", handler.appendProductToCart);

router.delete("/:cid", handler.deleteCart);

router.delete("/:cid/products/:pid", handler.deleteCartProduct);

export default router