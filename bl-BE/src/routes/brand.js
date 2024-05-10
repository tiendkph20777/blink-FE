import express from 'express';
import { createBrand, getAllBrands, getBrand, updateBrand, removeBrand } from '../controller/brand'
import { checkPermission } from '../middleware/checkPermission';

const brandRouter = express.Router();

brandRouter.post('/brand/add', checkPermission, createBrand);
brandRouter.get('/brand', getAllBrands);
brandRouter.get('/brand/:id', getBrand);
brandRouter.put('/brand/:id/update', checkPermission, updateBrand);
brandRouter.delete('/brand/:id', checkPermission, removeBrand);

export default brandRouter;
