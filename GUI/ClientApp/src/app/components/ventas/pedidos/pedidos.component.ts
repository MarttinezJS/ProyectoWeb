import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Pedido } from '../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


const swalYesNot = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-outline-success',
    cancelButton: 'btn btn-outline-danger'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  isAdmin: boolean;
  pedidos: Pedido[];
  dirty = false;
  pedidosModificados: Pedido[];
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  constructor(private authService: AuthService,
              private pedidoService: PedidoService,
              private rutaActiva: ActivatedRoute,
              private ruta: Router) {
    this.pedidosModificados = new Array;
  }

  ngOnInit(): void {
    this.cargarPedidos();
  }


  cargarPedidos() {
    Swal.fire({
      icon: 'info',
      title: 'Buscando tus pedidos',
      text: 'Por favor espera...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.pedidoService.get().subscribe( p => {
      this.isAdmin = this.authService.verificarAdmin();
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
    let clase = '';
    switch ( estado ) {
      case 'Pendiente': clase = 'badge badge-pill badge-warning'; break;
      case 'Enviado': clase = 'badge badge-pill badge-primary' ; break;
      case 'Finalizado': clase = 'badge badge-pill badge-success' ; break;
      case 'Cancelado': clase = 'badge badge-pill badge-danger'; break;
      default:
        break;
    }
    return clase;
  }

  modificar( pedido: Pedido, estado: string ) {
    pedido.estado = estado;
    this.pedidosModificados.push(pedido);
    this.toast.fire({
      icon: 'info',
      title: 'Modificando pedido: ' + pedido.id
    });
    this.toast.showLoading();
    this.pedidoService.put( pedido ).subscribe( rest => {
      console.log(rest);
      this.toast.fire({
        icon: 'success',
        title: 'Cambiado'
      });
    });
    // this.dirty = true;
  }

  cancelarPedido( pedido: Pedido ) {
    if (pedido.estado === 'Pendiente') {
      swalYesNot.fire({
        title: 'Seguro que quieres cancelarlo?',
        text: 'Esta accion es irreversible!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, claro',
        cancelButtonText: 'Mejor no!',
        reverseButtons: false
      }).then( rest => {
        if ( rest.value ) {
          this.modificar( pedido, 'Cancelado');
        } else {
          swalYesNot.fire({
            title: 'Ufff...',
            text: 'Tu pedido sigue pendiente :)',
            icon: 'info'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Demasiado tarde :(',
        text: 'El pedido ya fue enviado'
      });
    }
  }

  pedidoCancelado( pedido: Pedido ) {
    return pedido.estado === 'Cancelado';
  }

}
