import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AltaUsuarioComponent } from './components/altas/alta-usuario/alta-usuario.component';
import { AltaProfesionalComponent } from './components/altas/alta-profesional/alta-profesional.component';
import { HomePacienteComponent } from './components/home/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './components/home/home-profesional/home-profesional.component';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { AltaAdminComponent } from './components/altas/alta-admin/alta-admin.component';
import { HabilitarProfComponent } from './components/habilitar-prof/habilitar-prof.component';
import { AgregarEspecialidadComponent } from './components/agregar-especialidad/agregar-especialidad.component';
import { AuthGuardGuard } from './guards/auth-guard.guard'
import { from } from 'rxjs';
import { ErrorComponent } from './components/error/error.component';
import {ProfesionalGuard} from './guards/profesional.guard'

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent, children: [
    { path:'paciente', component: AltaUsuarioComponent},
    { path:'profesional', component: AltaProfesionalComponent}
  ]},
  { path: 'home', children: [
    {path: '' , component: HomePacienteComponent},
    {path: 'profesional', component: HomeProfesionalComponent, canActivate: [ProfesionalGuard]},
    {path: 'admin', component: HomeAdminComponent}
  ], canActivate: [AuthGuardGuard]},
  { path: 'registro/admin', component: AltaAdminComponent, canActivate: [AuthGuardGuard]},
  { path: 'habilitar/profesional', component: HabilitarProfComponent, canActivate: [AuthGuardGuard]},
  { path: 'profesional/especialidades', component: AgregarEspecialidadComponent, canActivate: [AuthGuardGuard]},
  { path: 'error', component: ErrorComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
