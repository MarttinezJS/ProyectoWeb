import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { DetallePedido } from '../../models/DetallePedido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  detallesPedido: DetallePedido[];
  constructor(private rutaActiva: ActivatedRoute,
              private pedidoService: PedidoService ) { }

  ngOnInit(): void {
    this.traerPedido();
  }

  traerPedido() {
    Swal.fire({
      icon: 'info',
      title: 'Buscando datos',
      text: 'Por favor espera...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.pedidoService.get().subscribe( p => {
      Swal.close();
      this.detallesPedido = p.filter( pedido => pedido.id === this.rutaActiva.snapshot.params.id)[0].detallePedido;
    });
  }
}
