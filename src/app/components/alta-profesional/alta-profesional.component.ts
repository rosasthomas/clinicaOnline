import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../services/auth.service'
import {storage} from 'firebase'
import { Profesional } from 'src/app/clases/profesional';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-profesional',
  templateUrl: './alta-profesional.component.html',
  styleUrls: ['./alta-profesional.component.scss']
})
export class AltaProfesionalComponent implements OnInit {

  fotoUno = '../../../assets/usuDefault.png' 
  fotoDos = '../../../assets/usuDefault.png'
  usuario:Profesional
  error = false
  constructor(public servicio:AuthService, public router:Router) { 
    this.usuario = new Profesional()
  }

  ngOnInit(): void {
  }

  registrar(){
    this.error = false
    $("#errorProf").attr('hidden', true)
    $("#spanProf").text('')

    this.usuario.email = $("#email").val()
    this.usuario.pass = $("#contrasena").val()
    if(this.validarCorreo(this.usuario.email) && this.validarClave(this.usuario.pass)){
      this.usuario.perfil = 'profesional'
      this.usuario.fotoUno = 'default'
      this.usuario.fotoDos = 'default'  
      this.agregarEspecialidades()
      this.upload()
      this.servicio.registerUser(this.usuario).catch(e=>{this.textoMostrar(e)}).then(a=>{
        this.servicio.sendVerificationEmail()
        this.router.navigate(['/login'])  
      })
    }
  }


  validarCorreo(email) : boolean
  {
    let retorno = false;
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;

    if(regex.test(email))
    {
      retorno = true;
    }
    else if(email == "")
    {
      this.error = true
      $("#spanProf").text('Correo requerido')
      $("#errorProf").removeAttr('hidden')
    }
    else
    {
      this.error = true
      $("#spanProf").text('El campo debe ser de tipo correo')
      $("#errorProf").removeAttr('hidden')
    }

    return retorno;
  }

  validarClave(pass:string) : boolean
  {
    let retorno = false

    if(pass.length >= 6)
    {
        retorno = true;
    }
    else if(pass == "")
    {
      this.error = true
      $("#spanProf").text('Correo requerido')
      $("#errorProf").removeAttr('hidden')
    }
    else if(pass.length < 6)
    {
      this.error = true
      $("#spanProf").text('La clave debe ser mayor a 6 digitos')
      $("#errorProf").removeAttr('hidden')
    }
    else
    {
      this.error = true
      $("#spanProf").text('Contraseña no válida')
      $("#errorProf").removeAttr('hidden')
    }

    return retorno;
  }

  textoMostrar(msj){
    switch(msj.code){
      case 'auth/weak-password':
        this.error = true
        $("#spanProf").text('La contraseña debe tener mínimo 6 caracteres')
        $("#errorProf").removeAttr('hidden')  
        console.log('La contraseña debe tener mínimo 6 caracteres')
        break;
      case 'auth/argument-error':
        this.error = true
        $("#spanProf").text('E-Mail o contraseña incorrectos')
        $("#errorProf").removeAttr('hidden')  
        console.log('E-Mail o contraseña incorrectos')
        break;
      case 'auth/email-already-in-use':
        this.error = true
        $("#spanProf").text('El Email ingresado ya existe')
        $("#errorProf").removeAttr('hidden')  
        console.log('El Email ingresado ya existe')
        break;
      case "auth/invalid-email":
        this.error = true
        $("#spanProf").text('El Email tiene un formato incorrecto')
        $("#errorProf").removeAttr('hidden')  
        console.log('El Email tiene un formato incorrecto')
        break;
      default:
        this.error = true
        $("#spanProf").text(msj)
        $("#errorProf").removeAttr('hidden')  
        console.log(msj)
        break;
    }
  }

  upload()
  {
    let fotoUno = $('#fotoUno').val()
    let fotoDos = $('#fotoDos').val()
    if(fotoUno != ''){
      fotoUno = $('#fotoUno').prop("files")[0];
      this.usuario.fotoUno = `profesionales/${this.usuario.email}-uno`
      let ref = storage().ref(`profesionales/${this.usuario.email}-uno`)
      const metaData = {'contentType' : fotoUno.type}
      ref.put(fotoUno, metaData);
    }
    if(fotoDos != ''){
      fotoDos = $('#fotoDos').prop("files")[0];
      this.usuario.fotoDos = `profesionales/${this.usuario.email}-dos`
      let ref = storage().ref(`profesionales/${this.usuario.email}-dos`)
      const metaData = {'contentType' : fotoDos.type}
      ref.put(fotoDos, metaData);
    }
  }

  agregarEspecialidades(){
    let espUno = $("#espUno").val()
    let espDos = $("#espDos").val()
    let espTres = $("#espTres").val()

    if(espUno != ''){
      this.usuario.especialidades.push(espUno)
    }
    if(espDos != ''){
      this.usuario.especialidades.push(espDos)
    }
    if(espTres != ''){
      this.usuario.especialidades.push(espTres)
    }
  }
}
