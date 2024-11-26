import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListadoActoresComponent } from './listado-actores/listado-actores.component';
import { DetalleActorComponent } from './detalle-actor/detalle-actor.component';
import { CrearActorComponent } from './crear-actor/crear-actor.component';

const routes: Routes = [
  { path: '', component: ListadoActoresComponent },
  { path: 'create', component: CrearActorComponent },
  { path: ':id', component: DetalleActorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ActorRoutingModule { }