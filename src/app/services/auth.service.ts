import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { Profesional } from '../clases/profesional';
import { Admin } from '../clases/admin';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) { }

  logout(){
    return this.afAuth.auth.signOut()
  }

  registerUser(user){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.pass)
      .then(userData => { 
        resolve(userData)
        switch(user.perfil){
          case 'admin':
            let adminCollection = this.db.collection('admins');
            adminCollection.doc(user.email).set({
              email: user.email,
              pass: user.pass,
              perfil: user.perfil,
            });
            break;
          case 'profesional':
            let profesionalCollection = this.db.collection('profesionales');
            profesionalCollection.doc(user.email).set({
              email: user.email,
              pass: user.pass,
              perfil: user.perfil,
              fotoUno: user.fotoUno,
              fotoDos: user.fotoDos,
              habilitado: false,
              especialidades: user.especialidades
            });
            break;
          case 'paciente':
            let usuariosCollection = this.db.collection('pacientes');
            console.log(user)
            usuariosCollection.doc(user.email).set({
              email: user.email,
              pass: user.pass,
              perfil: user.perfil,
              fotoUno: user.fotoUno,
              fotoDos: user.fotoDos
            });
            break;
        }
      }, err => reject (err))
    });
  }

  loginEmail(email:string, pass:string, ){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData => {
        resolve(userData)
       
      }, err => reject (err)).catch( e=>reject(e))
    });
  }

  sendVerificationEmail(){
    let currentUser = this.afAuth.auth.currentUser
    currentUser.sendEmailVerification()
  }

  obtenerUsuario():any{
    return this.afAuth.auth.currentUser
  }

  isEmailVerified(){
    let user = this.obtenerUsuario()
    return user.emailVerified
  }
}