import fs from 'fs/promises';
import { Product } from '../models/product.model.js';

export class DataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  async getAllData() {
    const data = await fs.readFile(this.path, { encoding: 'utf8' });
    return JSON.parse(data);
  }

  async getById(idParam) {
    let data = await this.getAllData();

    if (!data) {
      throw new Error('Esta vacio');
    }

    const filteredData = data.filter((product) => product.id === idParam);

    if (!filteredData || filteredData.length === 0)
      throw new Error(`No existe este producto: ${idParam}`);

    const objetoPlain = filteredData[0];
    console.log(objetoPlain);

    return objetoPlain;
  }

  async createProduct(product) {
    let data = await this.getAllData();
    data.push(product);
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));

    return {
      idProduct: product.id,
    };
  }

  //borrar
  async deleteProduct(product) {
    const { id } = product;
    console.log(id, 'del repository');
    let data = await this.getAllData();
    const filteredData = data.filter((producto) => producto.id !== id);
    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));
  }

  // V1 del profesor
  async updateProduct(product) {
    const { id } = product;

    let data = await this.getAllData();

    const filteredData = data.filter((producto) => producto.id !== id);
    //const oldDataProduct = data.filter((producto) => producto.id === id); //devuelve array
    const oldDataProduct = data.find((producto) => producto.id === id); //devuelve objeto

    filteredData.push(product);

    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

    return { oldDataProduct, newDataProduct: product };
  }

  // // Actualizar V2
  // async updateProduct(product) {
  //   const { id } = product;

  //   let data = await this.getAllData();

  //   // Busco el producto original (objeto)
  //   const oldDataProduct = data.find((producto) => producto.id === id);

  //   // Si no existe, corto
  //   if (!oldDataProduct) {
  //     throw new Error('Producto no encontrado');
  //   }

  //   // Creo nuevo listado sin ese producto
  //   const filteredData = data.filter((producto) => producto.id !== id);

  //   // Agrego el producto actualizado
  //   filteredData.push(product);

  //   // Persisto
  //   await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

  //   return {
  //     oldDataProduct, // objeto
  //     newDataProduct: product, // objeto
  //   };
  // }

  // Actualizar producto version de Julieta Ventre (PUT /api/v1/productos/:id)  con auth
  // actualizarProducto: async (id, data) => {
  //   const existente = await ProductoRepository.getById(id);
  //   if (!existente) {
  //     const err = new Error("Producto no encontrado");
  //     err.statusCode = 404;
  //     throw err;
  //   }

  //   const updates = {};

  //   // nombre de producto
  //   if (data.producto !== undefined) {
  //     if (!data.producto || data.producto.trim() === "") {
  //       const err = new Error("El producto es obligatorio");
  //       err.statusCode = 400;
  //       throw err;
  //     }
  //     updates.producto = data.producto;
  //   }

  //   // manejo de stock:
  //   //   - stockAmount directo (entero >= 0)
  //   //   - incrementoStock (entero >= 1)
  //   let stockBase =
  //     data.stockAmount != null
  //       ? data.stockAmount
  //       : existente.stockAmount;

  //   if (data.stockAmount != null) {
  //     if (
  //       !Number.isInteger(data.stockAmount) ||
  //       data.stockAmount < 0
  //     ) {
  //       const err = new Error("El stock es inválido");
  //       err.statusCode = 400;
  //       throw err;
  //     }
  //     updates.stockAmount = data.stockAmount;
  //   }

  //   if (data.incrementoStock != null) {
  //     if (
  //       !Number.isInteger(data.incrementoStock) ||
  //       data.incrementoStock < 1
  //     ) {
  //       const err = new Error("El incremento mínimo es 1");
  //       err.statusCode = 400;
  //       throw err;
  //     }

  //     const nuevoStock = stockBase + data.incrementoStock;
  //     if (!Number.isInteger(nuevoStock) || nuevoStock < 0) {
  //       const err = new Error("El stock resultante es inválido");
  //       err.statusCode = 400;
  //       throw err;
  //     }
  //     updates.stockAmount = nuevoStock;
  //   }

  //   // fechaIngreso opcional (si se envía, la normalizamos a YYYY-MM-DD)
  //   if (data.fechaIngreso !== undefined) {
  //     const date = new Date(data.fechaIngreso);
  //     if (isNaN(date.getTime())) {
  //       const err = new Error("La fecha de ingreso es inválida");
  //       err.statusCode = 400;
  //       throw err;
  //     }
  //     updates.fechaIngreso = date.toISOString().split("T")[0];
  //   }

  //   // Si no vino ningún campo para actualizar:
  //   if (Object.keys(updates).length === 0) {

  //     const err = new Error("No se enviaron campos para actualizar");
  //     err.statusCode = 400;
  //     throw err;
  //   }

  //   const actualizado = await ProductoRepository.update(id, updates);
  //   return actualizado;
  // },
}
