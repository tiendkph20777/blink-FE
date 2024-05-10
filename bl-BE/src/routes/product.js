import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, removeProduct, updateProductStatus } from '../controller/product'
import { checkPermission } from '../middleware/checkPermission';

const productRouter = express.Router();

productRouter.post('/product/add', createProduct);
productRouter.get('/product', getAllProducts);
productRouter.get('/product/:id', getProductById);
productRouter.put('/product/:id/update', checkPermission, updateProduct);
productRouter.delete('/product/:product_id', checkPermission, removeProduct);
productRouter.put('/product/:product_id/updateStatus/:status', updateProductStatus);



export default productRouter;
