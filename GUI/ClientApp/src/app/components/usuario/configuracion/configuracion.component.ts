import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { User } from 'firebase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styles: [
  ]
})
export class ConfiguracionComponent implements OnInit {

  formulario: FormGroup;
  usuario: User;
  progreso: number;
  task: AngularFireUploadTask;
  ref: any;
  pausada: boolean;
  subiendo = false;

  constructor(private afAuth: AngularFireAuth,
              private fb: FormBuilder,
              private storage: AngularFireStorage) {
    this.afAuth.authState.subscribe( rest => {
    this.usuario = rest;
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      email: [],
      phoneNumber: [],
      displayName: [],
    });
  }

  subirImagen( evento ) {
    this.subiendo = true;
    const archivo = evento.target.files[0];
    let nombre = new Date().getTime().toString();
    nombre = nombre + archivo.name.toString().substring( archivo.name.toString().lastIndexOf('.') ) ;
    const ruta = 'Clientes/' + nombre;
    this.ref = this.storage.ref(ruta);
    this.task = this.ref.put(archivo);

    this.task.percentageChanges().subscribe( percent => {
      // tslint:disable-next-line: radix
      this.progreso = parseInt( percent.toString() );
    });
  }

  obtenerImageURL() {
    this.task.then(rest => {
      this.subiendo = false;
      this.progreso = 0;
      this.ref.getDownloadURL().subscribe( imgURL => {
        console.log(imgURL);
        this.usuario.photoURL = imgURL;
      });
    }).catch( error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message_
      });
    });
  }

  cancelarSubida() {
    this.subiendo = !this.task.cancel();
    this.progreso = 0;
  }

  pausarSubida() {
    this.pausada = this.task.pause();
  }

  continuarSubida() {
    this.pausada = !this.task.resume();
  }

  onSubmit() {
    console.log(this.usuario);
    // this.afAuth.auth.updateCurrentUser();
  }
}
