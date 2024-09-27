// monticuloMin.ts
import { Orden } from './orden';

export class MonticuloMin {
  private datos: Orden[] = [];

  insertar(orden: Orden) {
    this.datos.push(orden);
    this.subir(this.datos.length - 1);
  }

  extraerMin(): Orden | undefined {
    if (this.datos.length === 0) return undefined;
    const min = this.datos[0];
    const fin = this.datos.pop();

    if (this.datos.length > 0 && fin) {
      this.datos[0] = fin;
      this.bajar(0);
    }

    return min;
  }

  private subir(index: number) {
    let i = index;
    const elemento = this.datos[i];

    while (i > 0) {
      const padreIndex = Math.floor((i - 1) / 2);
      const padre = this.datos[padreIndex];

      if (elemento.precio >= padre.precio) break;
      this.datos[i] = padre;
      i = padreIndex;
    }

    this.datos[i] = elemento;
  }

  private bajar(index: number) {
    let i = index;
    const longitud = this.datos.length;
    const elemento = this.datos[i];

    while (true) {
      let hijoIzqIndex = 2 * i + 1;
      let hijoDerIndex = 2 * i + 2;
      let izq, der;
      let swap = null;

      if (hijoIzqIndex < longitud) {
        izq = this.datos[hijoIzqIndex];
        if (izq.precio < elemento.precio) {
          swap = hijoIzqIndex;
        }
      }

      if (hijoDerIndex < longitud) {
        der = this.datos[hijoDerIndex];
        if (
          (swap === null && der.precio < elemento.precio) ||
          (swap !== null && der.precio < izq.precio)
        ) {
          swap = hijoDerIndex;
        }
      }

      if (swap === null) break;
      this.datos[i] = this.datos[swap];
      i = swap;
    }

    this.datos[i] = elemento;
  }
}
