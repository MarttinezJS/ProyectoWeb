import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Pedido } from '../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  isAdmin: boolean;
  pedidos: Pedido[];
  clase: string;
  estado: string;

  constructor(private authService: AuthService,
              private pedidoService: PedidoService,
              private rutaActiva: ActivatedRoute,
              private ruta: Router) {
    this.isAdmin = authService.verificarAdmin();
    this.cargarPedidos();
  }

  ngOnInit(): void {}

  cargarPedidos() {
    Swal.fire({
      icon: 'info',
      title: 'Buscando tus pedidos',
      text: 'Por favor espera...'
    });
    Swal.showLoading();
    this.pedidoService.get().subscribe( p => {
      if ( this.isAdmin ) {
        this.pedidos = p;
      } else {
        const idCliente = this.rutaActiva.snapshot.params.id;
        this.pedidos = p.filter( ped => idCliente === ped.idCliente);
      }
      Swal.close();
    });
  }

  verEstado( estado: string ) {
    switch ( estado ) {
      case 'Pendiente': this.clase = 'badge badge-secondary'; break;
      case 'Enviado': this.clase = 'badge badge-primary' ; break;
      case 'Finalizado': this.clase = 'badge badge-success' ; break;
      case 'Cancelado': this.clase = 'badge badge-danger'; break;
      default:
        break;
    }
  }

}
