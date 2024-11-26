import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListadoPlataformasComponent } from './listado-plataformas/listado-plataformas.component';
import { DetallePlataformaComponent } from './detalle-plataforma/detalle-plataforma.component';
import { CrearPlataformaComponent } from './crear-plataforma/crear-plataforma.component';

const routes: Routes = [
  { path: '', component: ListadoPlataformasComponent },
  { path: 'create', component: CrearPlataformaComponent },
  { path: ':id', component: DetallePlataformaComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlataformaRoutingModule { }