import { RouterModule, Routes } from '@angular/router';

import { CursosListComponent } from "./cursos-list/cursos-list.component";
import { CursoFormComponent } from './curso-form/curso-form.component';

import { AlumnoComponent } from "./abm-alumno/alumno.component";
import { AlumnoFormComponent } from './alumno-form/alumno-form.component';

import { TemaComponent } from "./abm-tema/tema.component";
import { TemaFormComponent } from "./tema-form/tema-form.component";

import { DocenteComponent } from "./abm-docente/docente.component";
import { DocenteFormComponent } from "./docente-form/docente-form.component";


import { HomeComponent } from "./home/home.component";
import { NgModule } from '@angular/core';



export const routes: Routes = [
    { path: 'cursos', component: CursosListComponent },
    { path: 'nuevo-curso', component: CursoFormComponent },
    { path: 'editar-curso/:id', component: CursoFormComponent },
    { path: 'alumnos', component: AlumnoComponent },    
    { path: 'nuevo-alumno', component: AlumnoFormComponent },
    { path: 'editar-alumno/:id', component: AlumnoFormComponent },
    { path: 'temas', component: TemaComponent },
    { path: 'nuevo-tema', component: TemaFormComponent },
    { path: 'editar-tema/:id', component: TemaFormComponent },
    { path: 'docentes', component: DocenteComponent },
    { path: 'nuevo-docente', component: DocenteFormComponent },
    { path: 'editar-docente/:id', component: DocenteFormComponent },
    { path: 'home', component: HomeComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }