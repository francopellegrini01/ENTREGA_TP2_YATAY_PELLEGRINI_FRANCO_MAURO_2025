import { randomBytes } from 'crypto';

export class Product {
  constructor(producto, stockAmount, fechaIngreso, id = null) {
    this.id = id ?? randomBytes(4).toString('hex');
    this.producto = producto;
    this.stockAmount = stockAmount;
    // Si no viene fecha, se deberia asignar la de hoy
    this.fechaIngreso = fechaIngreso ? new Date(fechaIngreso) : new Date();
  }
}
