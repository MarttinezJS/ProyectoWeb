import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName} from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

import Swal from 'sweetalert2';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',

  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  formGroup: FormGroup;
  usuario: Usuario;
  constructor( private fb: FormBuilder,
               private _usuarioService: UsuarioService,
               private afAuth: AngularFireAuth
    ) {
    this.crearFormulario();
    this.usuario = new Usuario();
   }

  onSubmit() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.usuario = this.formGroup.value;
    this.usuario.id = new Date().getTime().toString();
    this.afAuth.auth.createUserWithEmailAndPassword( this.formGroup.value.email, this.formGroup.value.password )
    .then( rest => {
      console.log( rest );
      this._usuarioService.post(this.usuario).subscribe(p => {
        if (p === null) {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
          });
        } else {
          Swal.fire({
            title: 'Registrado correctamente',
            icon: 'success'
          });
        }
      });
    }).catch( err => {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: err.message
      });
    });
  }

  get nombreNoValido() {
    return this.formGroup.get('nombre').invalid && this.formGroup.get('nombre').touched;
  }
  get passNoValido() {
    return this.formGroup.get('pass').invalid && this.formGroup.get('pass').touched;
  }
  get correoNoValido() {
    return this.formGroup.get('correo').invalid && this.formGroup.get('correo').touched;
  }
  get telefonoNoValido() {
    return this.formGroup.get('telefono').invalid && this.formGroup.get('telefono').touched;
  }
  get direccionNoValido() {
    return this.formGroup.get('direccion').invalid && this.formGroup.get('direccion').touched;
  }


  private crearFormulario () {

    this.formGroup = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(3)]],
      correo   : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      telefono : ['', [Validators.required, Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}
