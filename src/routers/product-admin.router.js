import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { validateTokenMiddleware } from '../middleware/auth.middleware.js';

const { updateProduct, deleteProduct } = ProductController;

const productAdminRouter = express.Router();

productAdminRouter
  .put('/api/v1/productos/:id', validateTokenMiddleware, updateProduct)
  .delete('/api/v1/productos/:id', validateTokenMiddleware, deleteProduct);

export default productAdminRouter;
