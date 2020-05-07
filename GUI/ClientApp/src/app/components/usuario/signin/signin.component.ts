import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName} from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent {

  formGroup: FormGroup;
  usuario: Usuario;
  constructor( private fb: FormBuilder,
               private _usuarioService: UsuarioService
    ) {
    this.crearFormulario();
    this.usuario = new Usuario();
   }

  onSubmit() {
    this.usuario = this.formGroup.value;
    this.usuario.id = new Date().getTime().toString();
    this._usuarioService.post(this.usuario).subscribe(p => {
      if (p != null) {
        p = this.usuario;
        alert(p.nombre + ' ha sido creado');
      }
    });
  }

  private crearFormulario () {

    this.formGroup = this.fb.group({
      nombre   : ['', Validators.required],
      correo   : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass     : ['', Validators.required],
      telefono : [, Validators.required],
      direccion: ['', Validators.required]
    });
  }
}
