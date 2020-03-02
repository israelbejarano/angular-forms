import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';


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
    acepta: false,
    genero: ''
  };

  /* paises = [
    {
      codigo: 'ESP',
      pais: 'España'
    },
    {
      codigo: 'ES',
      pais: 'Estados Unidos'
    }
  ]; */

  paises: any[] = [];

  sexos = ['hombre', 'mujer', 'sin definir'];

  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe((paises: any) => {
      console.log(paises);
      this.paises = paises;
      this.paises.unshift({
        nombre: '--- seleccione pais ---',
        codigo: ''
      });
    });
  }

  guardar(forma: NgForm) {
    console.log('Formulario posteado');
    console.log('ngForm', forma);
    console.log('valor', forma.value);
    console.log('usuario', this.usuario);
  }

}
