import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/Producto';
import { AuthService } from '../../../services/auth.service';
import { DetallePedido } from '../../models/DetallePedido';
import { DetallePedidoService } from '../../../services/detalle-pedido.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnDestroy, OnInit {

  productos: Producto[];
  detalles: DetallePedido[] = [];
  termino: string;
  isAdmin: boolean;
  valor: any;
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

  constructor(private productosServicio: ProductoService,
              private authService: AuthService,
              private detallePedidoService: DetallePedidoService ) {
    this.detalles = detallePedidoService.getdetalles();
  }

  ngOnDestroy(): void {
    this.detallePedidoService.setdetalles(this.detalles);
  }

  ngOnInit(): void {
    this.cargarLista();
  }
  cargarLista() {
    Swal.fire({
      icon: 'info',
      title: 'Colocando productos en el mostrador.',
      text: 'por favor espere...',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.productosServicio.get().subscribe(result => {
      this.isAdmin = this.authService.verificarAdmin();
      this.productos = result;
      Swal.close();
    });
  }

  agregarProd( producto: Producto, cantidad: number, presentacion: string ) {
    this.toast.fire({
      icon: 'success',
      title: 'Se Añadió ' + producto.nombre
    });
    const detallePedido = new DetallePedido();
    detallePedido.producto = producto;
    detallePedido.idProducto = producto.id;
    // tslint:disable-next-line: radix
    detallePedido.cantidad = parseInt(cantidad.toString());
    detallePedido.presentacion = presentacion;
    this.detalles.push( detallePedido );
  }

   modalEmergente( producto: Producto ) {
    Swal.fire({
      title: 'Cantidad',
      input: 'number',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Necesitas especificar la cantidad.';
        }
      }
    }).then( cantidad => {
      if (!cantidad.dismiss || cantidad.value > 0) {
        Swal.fire({
          title: 'Presentacion (Kilo por defecto)',
          input: 'select',
          inputOptions: {
            Kilo: 'Kilo',
            Libra: 'Libra',
            Gramo: 'Gramo',
          },
          inputPlaceholder: 'Presentacion del detallePedido',
          showCancelButton: true,
        }).then( presentacion => {
          if ( presentacion ) {
            this.agregarProd( producto, cantidad.value, presentacion.value );
          }
        });
      }
    });

  }
}
