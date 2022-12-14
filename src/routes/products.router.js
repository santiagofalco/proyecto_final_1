import {Router} from 'express';
import ProductService from '../services/product.service.js';
import { ProductHandler } from './handlers/products.handlers.js';
import authMiddleware from '../middlewares/authMiddleware.js'
import { getProductPersistance } from '../daos/products/factory.js';

const router = Router()

const productPersistance = await getProductPersistance()

const service = new ProductService(productPersistance)
const handler = new ProductHandler(service) 


router.get("/", handler.getAllProducts);

router.get("/:pid", handler.getProductById);

router.post("/", handler.addProductToList);

router.put("/:pid", handler.updateProduct);

router.delete("/:pid", handler.deleteProductById);

export default router