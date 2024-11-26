import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListadoPeliculasComponent } from './listado-peliculas/listado-peliculas.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { CrearPeliculaComponent } from './crear-pelicula/crear-pelicula.component';

const routes: Routes = [
  { path: '', component: ListadoPeliculasComponent },
  { path: 'create', component: CrearPeliculaComponent},
  { path: ':id', component: DetallePeliculaComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PeliculaRoutingModule { }