import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleGeneroComponent } from './detalle-genero/detalle-genero.component';
import { CrearGeneroComponent } from './crear-genero/crear-genero.component';

const routes: Routes = [
  { path: 'create', component: CrearGeneroComponent },
  { path: ':id', component: DetalleGeneroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneroRoutingModule { }