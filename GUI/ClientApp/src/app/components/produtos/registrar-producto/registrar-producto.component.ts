import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  grupo: FormGroup;
  producto: Producto;
  constructor( private fb: FormBuilder,
               private productoService: ProductoService) {
    this.crearFormulario();
   }

  ngOnInit() {
  }

  crearFormulario() {
    this.grupo = this.fb.group({
      id         : [],
      nombre     : [],
      prevedor   : [],
      precio     : [],
      descripcion: []
    });
  }

  guardarProducto() {
    if (this.grupo.valid) {
      this.producto = this.grupo.value;
      this.productoService.post(this.producto).subscribe( p => {
        if (p != null) {
          p = this.producto;
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'No se pudo completar la operacion'
          });
        } else {
          Swal.fire({
            title: 'Registrado correctamente',
            icon: 'success'
          });
        }
      });
    }
  }

}
