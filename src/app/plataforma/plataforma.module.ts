import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPlataformasComponent } from './listado-plataformas/listado-plataformas.component';
import { SharedModule } from '../shared/shared.module';
import { PlataformaRoutingModule } from './plataforma.routing.module';
import { DetallePlataformaComponent } from './detalle-plataforma/detalle-plataforma.component';
import { CrearPlataformaComponent } from './crear-plataforma/crear-plataforma.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoPlataformasComponent,
    DetallePlataformaComponent,
    CrearPlataformaComponent
  ],
  exports: [
    ListadoPlataformasComponent
  ],
  imports: [
    CommonModule,
    PlataformaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PlataformaModule { }
