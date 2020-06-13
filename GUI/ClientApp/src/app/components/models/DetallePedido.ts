import { Producto } from './Producto';
import { empty } from 'rxjs';

export class DetallePedido {
    id: string;
    idProducto: string;
    producto: Producto;
    cantidad: number;
    presentacion: string;
    subTotal: number;

    constructor( ) {
        this.id =  new Date().getTime().toString();
    }
}
