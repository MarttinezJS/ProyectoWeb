import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  formulario: FormGroup;
  producto: Producto;
  photoSelected: string | ArrayBuffer;
  tarea: AngularFireUploadTask;
  porcentaje: number;
  imgURL = '';
  subido = false;
  pausado = false;

  constructor( private fb: FormBuilder,
               private productoService: ProductoService,
               private storage: AngularFireStorage) {
    this.crearFormulario();
   }

  ngOnInit() {
  }

  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get idNoValido() {
    return this.formulario.get('id').invalid && this.formulario.get('id').touched;
  }
  get proveedorNoValido() {
    return this.formulario.get('proveedor').invalid && this.formulario.get('proveedor').touched;
  }
  get precioNoValido() {
    return this.formulario.get('precio').invalid && this.formulario.get('precio').touched;
  }
  get descripcionNoValido() {
    return this.formulario.get('descripcion').invalid && this.formulario.get('descripcion').touched;
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id         : ['', [Validators.required, Validators.maxLength(3)]],
      nombre     : ['', Validators.required],
      proveedor   : ['', Validators.required],
      precio     : ['', Validators.required],
      descripcion: ['', Validators.required],
      presentacion: ['']
    });
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(file);

      this.subido = false;
      this.pausado = false;
      let nombre = new Date().getTime().toString();
      nombre = nombre + file.name.toString().substring( file.name.toString().lastIndexOf('.') );
      const ruta = 'Productos/'  + nombre;
      console.log(nombre);
      const ref = this.storage.ref(ruta);
      this.tarea = ref.put( file );

      this.tareaState( ref );
      this.tareaPercent();
    }
  }

  tareaState( ref: AngularFireStorageReference ) {
    this.tarea.then( rest => {
      this.subido = true;
      ref.getDownloadURL().subscribe( imgURL => {
        this.imgURL = imgURL;
      });
      Swal.fire({
        icon: 'success',
        title: 'Archivo subido'
      });
    }).catch( e => {
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: e.message_
      });
    });
  }

  tareaPercent() {
    this.tarea.percentageChanges().subscribe( porcentaje => {
      this.porcentaje = porcentaje;
    });
  }

  guardarProducto() {
    if (this.formulario.valid) {
      this.producto = this.formulario.value;
      this.producto.imageURL = this.imgURL;
      this.productoService.post(this.producto).subscribe( p => {
        if (p != null) {
          Swal.fire({
            title: 'Registrado correctamente',
            icon: 'success'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'No se pudo completar la operacion'
          });
        }
      });
    }
  }

  pausarSubida() {
    this.pausado = this.tarea.pause();
  }

  continuarSubida() {
    this.pausado = !this.tarea.resume();
  }

  cancelarSubida() {
    this.subido = !this.tarea.cancel();
  }

}
