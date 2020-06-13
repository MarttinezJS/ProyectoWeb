import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Pedido } from '../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  isAdmin: boolean;
  pedidos: Pedido[];

  constructor(private authService: AuthService,
              private pedidoService: PedidoService) {
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
      this.pedidos = p;
      Swal.close();
      console.log(p);
    });
  }

}
