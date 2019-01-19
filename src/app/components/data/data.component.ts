import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { isPromiseAlike } from 'q';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;
  usuario = {
    nombreCompleto: {
      nombre: 'Israel',
      apellido: 'Bejarano'
    },
    correo: 'israel.bejarano.a@gmail.com',
    pasatiempos: ['correr', 'dormir', 'comer']
  };

  constructor() {
    console.log(this.usuario);
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
          'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
          'apellido': new FormControl('', [Validators.required, this.noBejarano])
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('correr', Validators.required)
  
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario), // ejemplo de validacion asincrona
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });
    // this.forma.setValue(this.usuario); // esto inicializa los campos del form con los valores que hay en usuario
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.esIgual.bind(this.forma)
    ]);
    this.forma.controls['username'].valueChanges.subscribe(data =>{
      console.log(data);
    });
    this.forma.controls['username'].statusChanges.subscribe(data =>{
      console.log(data);
    });

  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  existeUsuario(control: FormControl): Promise<any>|Observable<any> {

    let promesa = new Promise(
      (resolve, reject)=> {
        setTimeout(()=>{
          if(control.value === 'ibejarano') {
            resolve({existe: true})
          } else {
            resolve(null)
          }
        }, 3000)
      }
    );
    return promesa;
  }

  noBejarano(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'bejarano') {
      return {
        nobejarano: true
      }
    }
    return null;
  }

  esIgual(control: FormControl): {[s: string]: boolean} {
    let forma: any = this;
    if(control.value !== forma.controls['password1'].value) {
      return {
        noiguales: true
      }
    }
    return null;
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
    // este reset sirve para inicializar los elementos, no solo limpia los campos si no que vuelve a activar las validaciones
    // y como estaban los inputs en el inicio.
    /*this.forma.reset({
      nombreCompleto: {
        nombre: '',
        apellido: ''
      },
      correo: ''
    });*/
  }

}
