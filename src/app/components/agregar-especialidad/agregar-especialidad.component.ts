import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-agregar-especialidad',
  templateUrl: './agregar-especialidad.component.html',
  styleUrls: ['./agregar-especialidad.component.scss']
})
export class AgregarEspecialidadComponent implements OnInit {

  profToUpdate:Profesional
  update = false
  user
  listado:Profesional[]
  constructor(public service:AuthService, public router:Router, public db :AngularFirestore) {
    let collection = this.db.collection('profesionales', ref => { return ref.where('habilitado', '==', false)})
    let observable = collection.valueChanges()
    observable.subscribe((datos:Profesional[])=>this.listado = datos)
  }

  ngOnInit(): void {
    this.user = this.service.obtenerUsuario()
  }

  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }

  agregar(){
    let esps:string = $("#nuevaEsp").val()
    let split = esps.split(',')
    let espeNew = []
    for (let string of split) {
      string = string.trim()
      espeNew.push(string)
    }
    this.profToUpdate.especialidades = espeNew
    this.db.collection('profesionales').doc(this.profToUpdate.email).update(this.profToUpdate)
    this.update  = false
  }

  mostrarUpdate(profesional:Profesional){
    this.profToUpdate = profesional;
    this.update = true
  }
}
