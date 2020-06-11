import { DetallePedido } from './DetallePedido';
import { Usuario } from './Usuario';

export class Pedido {
    id: string;
    fecha: string;
    total: number;
    detallePedido: DetallePedido[];
    idCliente: string;
    constructor() {
        this.id = new Date().getTime().toString();
        this.fecha = new Date().toString();
    }
}
