import { Producto } from './Producto';

export class DetallePedido {
    id: string;
    producto: Producto;
    cantidad: number;
    presentacion: string;
    subTotal: number;

    constructor( id: string ) {
        this.id = id;
    }
}
