import { Injectable } from '@angular/core';
import { Pedido } from '../components/models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedido: Pedido;
  constructor() {}

  getPedido() {
    return this.pedido;
  }

  setPedido( pedido: Pedido ) {
    this.pedido = pedido;
  }
}
