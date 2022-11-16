import { Router } from 'express';
import ProductService from '../services/product.service.js';
import { ProductHandler } from './handlers/products.handlers.js';
import { getProductPersistance } from '../daos/products/factory.js';

const router = Router()

const productPersistance = await getProductPersistance()

const service = new ProductService(productPersistance)
const handler = new ProductHandler(service)


router.get("/:id", async (req, res) => {
    const product = await service.getById(req.params.id)
    res.render('editProduct.pug', {
        message: 'Editar producto',
        product,
        userRole: req.session.user.role
    })
});

export default router