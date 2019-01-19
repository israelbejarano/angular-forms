import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: null,
    acepta: false
  };

  paises = [
    {
      codigo: 'ESP',
      pais: 'España'
    },
    {
      codigo: 'ES',
      pais: 'Estados Unidos'
    }
  ];

  sexos = ['hombre', 'mujer', 'sin definir'];
  constructor() { }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log('Formulario posteado');
    console.log('ngForm', forma);
    console.log('valor', forma.value);
    console.log('usuario', this.usuario);
  }

}
