import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPeliculasComponent } from './listado-peliculas/listado-peliculas.component';
import { SharedModule } from "../shared/shared.module";
import { PeliculaRoutingModule } from './pelicula-routing.module';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearPeliculaComponent } from './crear-pelicula/crear-pelicula.component';



@NgModule({
  declarations: [
    ListadoPeliculasComponent,
    DetallePeliculaComponent,
    CrearPeliculaComponent
  ],
  imports: [
    CommonModule,
    PeliculaRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class PeliculaModule { }
