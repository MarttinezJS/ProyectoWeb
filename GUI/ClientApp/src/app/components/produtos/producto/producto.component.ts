import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/Producto';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  productos: Producto[];
  termino: string;
  isAdmin: boolean;

  constructor(private productosServicio: ProductoService,
              private authService: AuthService ) {
    this.cargarLista();
    this.validarAdmin();
  }

  cargarLista() {
    this.productosServicio.get().subscribe(result => {
      this.productos = result;
      console.log(this.productos);
    });
  }

  validarAdmin() {
    this.isAdmin = this.authService.verificarAdmin();
  }
}
