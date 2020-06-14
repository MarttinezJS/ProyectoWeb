import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { AuthService } from '../../../services/auth.service';
import { Producto } from '../../models/Producto';
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
  isAdmin: boolean;
  accion: string;

  constructor( private fb: FormBuilder,
               private productoService: ProductoService,
               private storage: AngularFireStorage,
               private authService: AuthService,
               private router: Router,
               private rutaActiva: ActivatedRoute) {
    this.crearFormulario();
    this.botarIntruso();
    this.accion = this.rutaActiva.snapshot.params.action;
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
    this.producto = new Producto();
    this.formulario = this.fb.group({
      id         : [this.producto.id, [Validators.required, Validators.maxLength(3)]],
      nombre     : [this.producto.nombre, Validators.required],
      proveedor   : [this.producto.provedor, Validators.required],
      precio     : [this.producto.precio, Validators.required],
      descripcion: [this.producto.descripcion],
      presentacion: [this.producto.presentacion, Validators.required],
      img: []
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

  onSubmit() {
    if (this.formulario.valid) {
      this.producto = this.formulario.value;
      this.producto.imageURL = this.imgURL;
      Swal.fire({
        icon: 'info',
        title: 'Guardando producto',
        text: 'Por favor espere...',
        allowOutsideClick: false
      });
      Swal.showLoading();
      if ( this.accion === 'Registrar' ) {
        this.guardarProducto();
      } else {
        this.modificaProducto();
      }
    }
  }

  modificaProducto() {}

  guardarProducto() {
    this.productoService.post(this.producto).subscribe( p => {
      if (p != null) {
        Swal.fire({
          title: 'Registrado correctamente',
          icon: 'success'
        });
        this.formulario.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'No se pudo completar la operacion'
        });
      }
    });
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

  botarIntruso() {
    if (!this.authService.verificarAdmin()) {
      Swal.fire({
        icon: 'warning',
        title: 'Alto ahi intruso!!!',
        text: 'este lugar es solo para administradores',
        allowOutsideClick: false,
        confirmButtonAriaLabel: 'Ok, me voy'
      }).then( rest => {
        this.router.navigateByUrl('/');
      });
    }
  }


}
