import { DetallePedido } from './DetallePedido';
import { Usuario } from './Usuario';

export class Pedido {
    id: string;
    fecha: Date;
    total: number;
    detallePedido: DetallePedido[];
    cliente: Usuario;
    constructor() {
        this.id = new Date().getTime().toString();
    }
}
