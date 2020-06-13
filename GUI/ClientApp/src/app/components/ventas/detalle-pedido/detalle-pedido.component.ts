import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute,
              private pedidoService: PedidoService ) { }

  ngOnInit(): void {
    this.traerPedido();
  }

  traerPedido() {
    this.pedidoService.get().subscribe( p => {
      console.log(p.filter( pedido => pedido.id === this.rutaActiva.snapshot.params.id));
    });
  }
}
