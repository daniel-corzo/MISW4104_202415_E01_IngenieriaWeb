import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoDirectoresComponent } from './listado-directores/listado-directores.component';
import { SharedModule } from '../shared/shared.module';
import { DirectorRoutingModule } from './director-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DetalleDirectorComponent } from './detalle-director/detalle-director.component';
import { CrearDirectorComponent } from './crear-director/crear-director.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListadoDirectoresComponent,
    DetalleDirectorComponent,
    CrearDirectorComponent
  ],
  exports: [
    ListadoDirectoresComponent,
    DetalleDirectorComponent
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DirectorModule { }
