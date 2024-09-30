// Clase Order: Representa una orden de compra o venta
class Order {
    public buyer: string | null; // Nombre del comprador
    public seller: string | null; // Nombre del vendedor
    public company: string;
    public quantity: number;
    public price: number;
    public isBuyOrder: boolean;

    constructor(company: string, quantity: number, price: number, isBuyOrder: boolean, buyer: string | null = null, seller: string | null = null) {
        this.company = company;
        this.quantity = quantity;
        this.price = price;
        this.isBuyOrder = isBuyOrder;
        this.buyer = buyer;
        this.seller = seller;
    }
}

// Clase MaxHeap: Implementación de un montículo de máximo
class MaxHeap {
    private heap: Order[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMax(): Order {
        return this.heap[1];
    }

    public isEmpty(): boolean {
        return this.n === 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(order: Order): void {
        if (this.n === (this.heap.length - 1)) this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].price < this.heap[i].price) {
            let temp: Order = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        let newHeap: Order[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++) newHeap[i] = this.heap[i];
        this.heap = newHeap;
    }

    public getMax(): Order {
        let max: Order = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = new Order("", 0, 0, false); // empty order
        this.n--;
        this.sink(1);
        return max;
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i;
            if (j < this.n && this.heap[j].price < this.heap[j + 1].price) j++;
            if (this.heap[i].price >= this.heap[j].price) break;
            let temp: Order = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j;
        }
    }

    // Método público para obtener las órdenes
    public getHeap(): Order[] {
        return this.heap.slice(1, this.n + 1); // Devuelve solo los elementos válidos
    }
}

// Clase MinHeap: Implementación de un montículo de mínimo
class MinHeap {
    private heap: Order[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMin(): Order {
        return this.heap[1];
    }

    public isEmpty(): boolean {
        return this.n === 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(order: Order): void {
        if (this.n === (this.heap.length - 1)) this.resize(2 * this.heap.length);
        this.n++;
        this.heap[this.n] = order;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].price > this.heap[i].price) {
            let temp: Order = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        let newHeap: Order[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++) newHeap[i] = this.heap[i];
        this.heap = newHeap;
    }

    public getMin(): Order {
        let min: Order = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = new Order("", 0, 0, true); // empty order
        this.n--;
        this.sink(1);
        return min;
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i;
            if (j < this.n && this.heap[j].price > this.heap[j + 1].price) j++;
            if (this.heap[i].price <= this.heap[j].price) break;
            let temp: Order = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j;
        }
    }

    // Método público para obtener las órdenes
    public getHeap(): Order[] {
        return this.heap.slice(1, this.n + 1); // Devuelve solo los elementos válidos
    }
}

// Clase StockMarketSimulator: Simulador del mercado de acciones
class StockMarketSimulator {
    private buyOrders: MaxHeap = new MaxHeap(10);
    private sellOrders: MinHeap = new MinHeap(10);
    private transactions: any[] = [];

    // Colocar una orden de compra
    placeBuyOrder(order: Order): void {
        this.buyOrders.insert(order);
        this.matchOrders();
    }

    // Colocar una orden de venta
    placeSellOrder(order: Order): void {
        this.sellOrders.insert(order);
        this.matchOrders();
    }

    // Emparejar órdenes cuando sea posible
    private matchOrders(): void {
        while (!this.buyOrders.isEmpty() && !this.sellOrders.isEmpty()) {
            let maxBuy = this.buyOrders.checkMax();
            let minSell = this.sellOrders.checkMin();

            if (maxBuy.price >= minSell.price) {
                // Emparejamiento y registro de la transacción
                const quantityMatched = Math.min(maxBuy.quantity, minSell.quantity);
                this.transactions.push({
                    company: maxBuy.company,
                    price: minSell.price,
                    quantity: quantityMatched,
                    buyer: maxBuy.buyer,
                    seller: minSell.seller
                });

                // Actualizar cantidades
                maxBuy.quantity -= quantityMatched;
                minSell.quantity -= quantityMatched;

                if (maxBuy.quantity > 0) {
                    this.buyOrders.getMax(); // mantiene la orden si aún tiene cantidad
                    this.buyOrders.insert(maxBuy);
                } else {
                    this.buyOrders.getMax(); // elimina la orden de compra si se empareja completamente
                }

                if (minSell.quantity > 0) {
                    this.sellOrders.getMin(); // mantiene la orden si aún tiene cantidad
                    this.sellOrders.insert(minSell);
                } else {
                    this.sellOrders.getMin(); // elimina la orden de venta si se empareja completamente
                }
            } else {
                break;
            }
        }
    }

    // Mostrar órdenes pendientes
    displayPendingOrders(): void {
        console.log("Órdenes Pendientes:");
        console.log("Órdenes de Compra:");
        const buyOrders = this.buyOrders.getHeap();
        for (const order of buyOrders) {
            console.log(`Comprador: ${order.buyer}, Empresa: ${order.company}, Precio Máximo: ${order.price}`);
        }

        console.log("Órdenes de Venta:");
        const sellOrders = this.sellOrders.getHeap();
        for (const order of sellOrders) {
            console.log(`Vendedor: ${order.seller}, Empresa: ${order.company}, Precio Mínimo: ${order.price}`);
        }
    }

    // Mostrar historial de transacciones
    displayTransactionHistory(): void {
        console.log("Historial de Transacciones:");
        for (const transaction of this.transactions) {
            console.log(`Transacción de: ${transaction.quantity} acciones de ${transaction.company} a ${transaction.price} por acción del comprador: ${transaction.buyer} al vendedor: ${transaction.seller}`);
        }
    }
}

// Ejemplo de uso
const simulator = new StockMarketSimulator();

// Creando órdenes de compra y venta
simulator.placeBuyOrder(new Order('EmpresaA', 20, 100, true, 'Comprador1'));
simulator.placeBuyOrder(new Order('EmpresaA', 30, 105, true, 'Comprador2'));
simulator.placeSellOrder(new Order('EmpresaA', 25, 95, false, 'Vendedor1'));
simulator.placeSellOrder(new Order('EmpresaA', 10, 100, false, 'Vendedor2'));

// Mostrar órdenes pendientes
simulator.displayPendingOrders();

// Mostrar historial de transacciones
simulator.displayTransactionHistory();
