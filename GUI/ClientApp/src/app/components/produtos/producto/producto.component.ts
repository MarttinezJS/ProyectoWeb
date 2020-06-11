import { Component, OnDestroy } from '@angular/core';
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
export class ProductoComponent implements OnDestroy {

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
    this.cargarLista();
    this.validarAdmin();
  }

  ngOnDestroy(): void {
    this.detallePedidoService.setdetalles(this.detalles);
  }

  cargarLista() {
    this.productosServicio.get().subscribe(result => {
      this.productos = result;
    });
  }

  validarAdmin() {
    this.isAdmin = this.authService.verificarAdmin();
  }

  agregarProd( producto: Producto, cantidad: number, presentacion: string ) {
    this.toast.fire({
      icon: 'success',
      title: 'Se Añadió ' + producto.nombre
    });
    const detallePedido = new DetallePedido();
    detallePedido.producto = producto;
    detallePedido.cantidad = cantidad;
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
      if (!cantidad.dismiss) {
        Swal.fire({
          title: 'selecciona la presentacion',
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
