import { Producto } from './Producto';

export class DetallePedido {
    id: string;
    producto: Producto;
    cantidad: number;
    presentacion: string;

    constructor( id: string ) {
        this.id = id;
    }
}
