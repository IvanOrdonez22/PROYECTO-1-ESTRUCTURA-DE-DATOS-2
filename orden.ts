
export class Orden {
    public empresa: string;
    public tipo: string; // 'compra' o 'venta'
    public precio: number;
    public cantidad: number;
  
    constructor(empresa: string, tipo: string, precio: number, cantidad: number) {
      this.empresa = empresa;
      this.tipo = tipo;
      this.precio = precio;
      this.cantidad = cantidad;
    }
  
    detalles(): string {
      return `${this.tipo.toUpperCase()} - ${this.cantidad} acciones de ${this.empresa} a ${this.precio} por acción.`;
    }
  }
  