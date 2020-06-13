import { DetallePedidoService } from '../../../services/detalle-pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/Pedido';
import { DetallePedido } from '../../models/DetallePedido';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import Swal from 'sweetalert2';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido: Pedido;
  detallePedido: DetallePedido[];
  total: number;
  usuario = new Usuario();

  constructor(private detallePService: DetallePedidoService,
              private usuarioService: UsuarioService,
              private pedidoService: PedidoService) {
    this.detallePedido = detallePService.getdetalles();
    this.buscarUsuario();
  }

  ngOnInit(): void {
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = 0;
    this.detallePedido.forEach( dp => {
      this.total += dp.subTotal;
    });
  }
  buscarUsuario() {
    const id = localStorage.getItem('id');
    this.usuarioService.get().subscribe( usuarios => {
      usuarios.forEach( user => {
        if ( id === user.id ) {
          this.usuario = user;
        }
      });
    });
  }

  finalizaCompra() {
    Swal.fire({
      icon: 'info',
      title: 'Por favor espere...',
      text: 'Estamos Procesando su solicitud.'
    });
    Swal.showLoading();

    this.pedido = new Pedido();
    this.pedido.idCliente = this.usuario.id;
    this.pedido.detallePedido = this.detallePedido;
    this.pedido.total = this.total;


    this.pedidoService.post( this.pedido ).subscribe( p => {
      console.log(p);
      if (p != null) {
        Swal.fire({
          icon: 'success',
          title: 'Hecho'
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'No se pudo prosesar tu solicitud.'
        });
      }
      Swal.close();
    });

  }
}
