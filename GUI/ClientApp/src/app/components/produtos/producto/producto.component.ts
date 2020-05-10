import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/Producto';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos:Producto[];

  constructor(private productosServicio:ProductoService) { }

  ngOnInit(): void {
    this.productosServicio.get().subscribe(result =>{
        this.productos = result;
    });
  }

}
