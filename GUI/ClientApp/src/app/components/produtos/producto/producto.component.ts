import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/Producto';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  productos: Producto[];
  termino: string;
  constructor(private productosServicio: ProductoService) { this.cargarLista(); }

  cargarLista() {
    this.productosServicio.get().subscribe(result => {
      this.productos = result;
  });
  }
}
