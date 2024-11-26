import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoActoresComponent } from './listado-actores/listado-actores.component';
import { SharedModule } from "../shared/shared.module";
import { ActorRoutingModule } from './actor-routing.module';
import { DetalleActorComponent } from './detalle-actor/detalle-actor.component';
import { CrearActorComponent } from './crear-actor/crear-actor.component';


@NgModule({
  declarations: [
    ListadoActoresComponent,
    DetalleActorComponent,
    CrearActorComponent
  ],
  exports: [ListadoActoresComponent],
  imports: [
    CommonModule,
    SharedModule,
    ActorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ActorModule { }
