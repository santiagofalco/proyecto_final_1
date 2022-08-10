import {Router} from 'express';
import CartService from '../services/cart.service.js';
import { CartsHandler } from './handlers/carts.handlers.js';

const router = Router()


const service = new CartService('./carts.json')
const handler = new CartsHandler(service) 

router.post("/", handler.createCart);

router.get("/:cid/products", handler.getCart)

router.post("/:cid/products", handler.appendProductToCart);

router.delete("/:cid", handler.deleteCart);

router.delete("/:cid/products/:pid", handler.deleteCartProduct);

export default router