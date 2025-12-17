import express from 'express';
import { ProductController } from '../controllers/product.controller.js';

const productRouter = express.Router('');
const { createProduct, getById, getAllData } = ProductController;

productRouter
  .post('/api/v1/productos', createProduct)
  .get('/api/v1/productos', getAllData)
  .get('/api/v1/productos/:id', getById);

export default productRouter;
