import { DataBaseRepository } from '../repositories/json.repository.js';
import { Product } from '../models/product.model.js';

const database = new DataBaseRepository('database/database.db.json'); //la instancio

export const ProductController = {
  createProduct: async (req, res) => {
    const { id, producto, stockAmount, fechaIngreso } = req.body;

    try {
      // Validación: stock no puede ser negativo ni cero
      if (stockAmount <= 0) {
        throw new Error('Error!, El stock inicial debe ser mayor que 0');
      }

      // Validación: nombreProducto no puede ser null
      if (!producto) {
        throw new Error('Error!, el nombre del producto, no puede ser nulo');
      }

      const newProduct = new Product(producto, stockAmount, id, fechaIngreso);
      const response = await database.createProduct(newProduct);

      res.json({
        status: 201,
        OK: true,
        message: 'Producto creado',
        payload: response,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
    }
  },

  getAllData: async (req, res) => {
    const products = await database.getAllData();
    const productsObjectsArray = products.map(
      (product) =>
        new Product(product?.producto, product?.stockAmount, product?.fechaIngreso, product?.id),
    );

    console.log(productsObjectsArray);

    res.json({
      status: 200,
      OK: true,
      payload: productsObjectsArray,
    });
  },

  getById: async (req, res) => {
    const idParam = req.params.id;

    try {
      const responseData = await database.getById(idParam);

      res.json({
        status: 200,
        OK: true,
        message: 'existe el producto',
        payload: responseData,
      });

      return;
    } catch (error) {
      res.json({
        status: 404,
        OK: false,
        message: `No existe el producto con el id ${idParam}`,
      });
      return;
    }
  },

  getByIdBody: async (req, res) => {
    const { id } = req.body;
    try {
      const responseData = await database.getById(id); //la db tiene metodos, y el que quiero utilizar ahora, es le getbyiD.

      res.json({
        status: 200,
        OK: true,
        message: 'existe el producto',
        payload: responseData,
      });

      return;
    } catch (error) {
      //capturo el error, y quiero que sea un JSON de respuesta.
      res.json({
        status: 404,
        OK: false,
        message: `No existe el producto con el id ${id}`,
      });
      return;
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await database.getById(id);

      await database.deleteProduct(producto);
      res.json({
        status: 200,
        OK: true,
        message: `El producto: ${id} fue eliminado de la base de datos`,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { stockNuevo, nuevoNombre } = req.body;

    try {
      const producto = await database.getById(id);

      const stockNuevoNumber = Number(stockNuevo);
      const stockActual = producto.stockAmount; // O producto.stock según tu modelo

      // Validaciones
      if (!Number.isInteger(stockNuevoNumber)) {
        throw new Error('Error! El stock debe ser un entero');
      }

      if (stockNuevoNumber < 0) {
        throw new Error('Error! El stock no puede ser negativo');
      }

      if (Math.abs(stockNuevoNumber - stockActual) !== 1) {
        throw new Error('Error! El stock solo puede modificarse de a 1');
      }

      producto.stockAmount = stockNuevoNumber;
      producto.producto = nuevoNombre;

      const { oldDataProduct, newDataProduct } = await database.updateProduct(producto);

      res.json({
        status: 200,
        OK: true,
        oldDataProduct,
        newDataProduct,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
    }
  },

};
