import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListadoDirectoresComponent } from './listado-directores/listado-directores.component';
import { DetalleDirectorComponent } from './detalle-director/detalle-director.component';
import { CrearDirectorComponent } from './crear-director/crear-director.component';

const routes: Routes = [
  { path: '', component: ListadoDirectoresComponent },
  { path: 'create', component: CrearDirectorComponent },
  { path: ':id', component: DetalleDirectorComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DirectorRoutingModule { }