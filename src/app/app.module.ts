import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AltaUsuarioComponent } from './components/altas/alta-usuario/alta-usuario.component';
import { AltaProfesionalComponent } from './components/altas/alta-profesional/alta-profesional.component';

import { AuthService } from './services/auth.service'
import { environment } from '../environments/environment'

import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { HomePacienteComponent } from './components/home/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './components/home/home-profesional/home-profesional.component';
import { AltaAdminComponent } from './components/altas/alta-admin/alta-admin.component';
import { HabilitarProfComponent } from './components/habilitar-prof/habilitar-prof.component';
import { AgregarEspecialidadComponent } from './components/agregar-especialidad/agregar-especialidad.component';
import { ErrorComponent } from './components/error/error.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    AltaUsuarioComponent,
    AltaProfesionalComponent,
    HomeAdminComponent,
    HomePacienteComponent,
    HomeProfesionalComponent,
    AltaAdminComponent,
    HabilitarProfComponent,
    AgregarEspecialidadComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
