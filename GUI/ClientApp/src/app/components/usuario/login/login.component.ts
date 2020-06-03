import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje: string;
  formulario: FormGroup;
  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ingresar() {
    this.afAuth.auth.signInWithEmailAndPassword(this.formulario.value.email, this.formulario.value.password)
    .then( rest => {
      this.authService.guardaToken(rest.user.refreshToken);
      this.route.navigateByUrl('/inicio');
    })
    .catch( error => {
      switch (error.code) {
        case 'auth/wrong-password': this.mensaje = 'El usuario no está registrado o la contraseña es incorrecta.';
          break;
        case 'auth/invalid-email': this.mensaje = 'El correo no es valido.';
          break;
        case 'auth/user-disabled': this.mensaje = 'El usuario no tiene permitido iniciar sesion, por favor contactanos.';
          break;
        case 'auth/user-not-found': this.mensaje = 'El usuario no está registrado o la contraseña es incorrecta.';
          break;
        default: this.mensaje = 'Ocurrio un error al autenticar.';
          break;
      }
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: this.mensaje
      });
    });
  }

}
