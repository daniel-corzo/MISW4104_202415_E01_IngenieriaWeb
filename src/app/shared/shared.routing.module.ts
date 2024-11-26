import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AsociarEntidadesComponent } from './asociar-entidades/asociar-entidades.component';

const routes: Routes = [
  { path: 'association', component: AsociarEntidadesComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SharedRoutingModule { }