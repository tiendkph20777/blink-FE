import express from 'express';
import { createProductDetail, getAllProductDetail, getAllProductDetailAllProduct, getProductDetailByIdProduct, removeProductDetailbyID, updateProductDetail } from '../controller/productDetail';
import { checkPermission } from '../middleware/checkPermission';

const productDetailRouter = express.Router();

productDetailRouter.post('/productdetail/add', createProductDetail);
productDetailRouter.get('/productdetail/:product_id', getAllProductDetailAllProduct);
productDetailRouter.get('/productdetail', getAllProductDetail);
productDetailRouter.get('/productdetail/:product_id/detail', getProductDetailByIdProduct);
productDetailRouter.put('/productdetail/:product_id/detail/update', checkPermission, updateProductDetail);
productDetailRouter.delete('/productdetail/:product_id', checkPermission, removeProductDetailbyID);


export default productDetailRouter;
