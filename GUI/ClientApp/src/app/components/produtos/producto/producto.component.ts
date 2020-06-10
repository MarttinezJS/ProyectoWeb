import { Component, OnDestroy } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/Producto';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { DetallePedido } from '../../models/DetallePedido';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnDestroy {

  productos: Producto[];
  pedido: DetallePedido[] = [];
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
              private authService: AuthService ) {
    this.cargarLista();
    this.validarAdmin();
  }

  ngOnDestroy(): void {
    console.log('Se fue');
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
    const detallePedido = new DetallePedido( new Date().getTime().toString() );
    detallePedido.producto = producto;
    detallePedido.cantidad = cantidad;
    detallePedido.presentacion = presentacion;
    console.log(detallePedido);
    this.pedido.push( detallePedido );
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

            console.log(producto);
            this.agregarProd( producto, cantidad.value, presentacion.value );
          }
        });
      }
    });

  }
}
