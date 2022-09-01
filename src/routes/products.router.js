import {Router} from 'express';
import ProductService from '../services/product.service.js';
import { ProductHandler } from './handlers/products.handlers.js';
import authMiddleware from '../middlewares/authMiddleware.js'
import { getProductPersistance } from '../daos/products/index.js';

const router = Router()

const productPersistance = await getProductPersistance()

const service = new ProductService(productPersistance)
const handler = new ProductHandler(service) 


router.get("/", handler.getAllProducts);

router.get("/:pid", handler.getProductById);

router.post("/", authMiddleware, handler.addProductToList);

router.put("/:pid", authMiddleware, handler.updateProduct);

router.delete("/:pid", authMiddleware, handler.deleteProductById);

export default router