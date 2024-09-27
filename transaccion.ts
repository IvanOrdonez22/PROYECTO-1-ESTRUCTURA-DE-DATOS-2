// transaccion.ts
import { Orden } from './orden';

export class Transaccion {
  public compra: Orden;
  public venta: Orden;
  public cantidad: number;
  public precio: number;

  constructor(compra: Orden, venta: Orden, cantidad: number, precio: number) {
    this.compra = compra;
    this.venta = venta;
    this.cantidad = cantidad;
    this.precio = precio;
  }

  detalles(): string {
    return `Transacción: ${this.cantidad} acciones de ${this.compra.empresa} a ${this.precio} por acción entre ${this.compra.tipo} y ${this.venta.tipo}.`;
  }
}
