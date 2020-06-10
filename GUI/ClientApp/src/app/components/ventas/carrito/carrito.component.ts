import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido = new Pedido();
  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
  }

}
