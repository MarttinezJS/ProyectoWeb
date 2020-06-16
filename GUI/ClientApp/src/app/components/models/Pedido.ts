import { DetallePedido } from './DetallePedido';
import { Usuario } from './Usuario';

export class Pedido {
    id: string;
    fechaInicio: string;
    fechaFin: string;
    total: number;
    detallePedido: DetallePedido[];
    idCliente: string;
    estado: string;
    cliente: Usuario;

    constructor() {
        this.id = new Date().getTime().toString();
        this.fechaInicio = new Date().toTimeString();
        this.estado = 'Pendiente';
        this.fechaFin = 'En proceso';
    }
}
