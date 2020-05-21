import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { AltaProfesionalComponent } from './components/alta-profesional/alta-profesional.component';
import { HomePacienteComponent } from './components/home/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './components/home/home-profesional/home-profesional.component';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { AltaAdminComponent } from './components/altas/alta-admin/alta-admin.component';
import { HabilitarProfComponent } from './components/habilitar-prof/habilitar-prof.component';
import { AgregarEspecialidadComponent } from './components/agregar-especialidad/agregar-especialidad.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent, children: [
    { path:'paciente', component: AltaUsuarioComponent},
    { path:'profesional', component: AltaProfesionalComponent}
  ]},
  { path: 'home', children: [
    {path: '' , component: HomePacienteComponent},
    {path: 'profesional', component: HomeProfesionalComponent},
    {path: 'admin', component: HomeAdminComponent}
  ]},
  { path: 'registro/admin', component: AltaAdminComponent},
  { path: 'habilitar/profesional', component: HabilitarProfComponent},
  { path: 'profesional/especialidades', component: AgregarEspecialidadComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
