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

  formulario: FormGroup;
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
    this.usuario = this.formulario.value;
    this.usuario.id = new Date().getTime().toString();
    this.afAuth.auth.createUserWithEmailAndPassword( this.formulario.value.email, this.formulario.value.password )
    .then( rest => {
      this.usuario.id = rest.user.uid;
      this._usuarioService.post(this.usuario).subscribe(p => {
        if (p === null) {
          console.log('then' + p);
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
      console.log('catch' + err);
    });
  }

  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get passNoValido() {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }
  get correoNoValido() {
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }
  get telefonoNoValido() {
    return this.formulario.get('telefono').invalid && this.formulario.get('telefono').touched;
  }
  get direccionNoValido() {
    return this.formulario.get('direccion').invalid && this.formulario.get('direccion').touched;
  }


  private crearFormulario () {

    this.formulario = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(3)]],
      email   : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      telefono : ['', [Validators.required, Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}
