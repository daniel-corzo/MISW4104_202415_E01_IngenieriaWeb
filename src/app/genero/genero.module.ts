import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeneroRoutingModule } from './genero-routing.module';
import { DetalleGeneroComponent } from './detalle-genero/detalle-genero.component';
import { SharedModule } from "../shared/shared.module";
import { CrearGeneroComponent } from './crear-genero/crear-genero.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetalleGeneroComponent, CrearGeneroComponent],
  exports: [DetalleGeneroComponent, CrearGeneroComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GeneroRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class GeneroModule { }
