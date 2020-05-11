import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../models/Producto';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() productos: any = {};
  @Input() termino: any;

  constructor() { }

  ngOnInit() {
  }

  verProducto( producto: Producto ) {

  }

}
