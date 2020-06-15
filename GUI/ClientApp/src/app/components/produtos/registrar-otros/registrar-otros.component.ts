import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-registrar-otros',
  templateUrl: './registrar-otros.component.html',
  styleUrls: ['./registrar-otros.component.css']
})
export class RegistrarOtrosComponent implements OnInit {

  entrada:boolean;
  formulario: FormGroup;
  photoSelected: string | ArrayBuffer;

  constructor(private fb: FormBuilder) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get idNoValido() {
    return this.formulario.get('id').invalid && this.formulario.get('id').touched;
  }
  get descripcionNoValido() {
    return this.formulario.get('descripcion').invalid && this.formulario.get('descripcion').touched;
  }

  crearFormulario(){
    this.formulario = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(3)]],
    nombre: ['', [Validators.required]],
    descripcion : ['', [Validators.required]],
    });
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
