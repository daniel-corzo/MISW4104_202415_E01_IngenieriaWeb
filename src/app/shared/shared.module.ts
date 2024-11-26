import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes/safe.pipe';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsociarEntidadesComponent } from './asociar-entidades/asociar-entidades.component';
import { SharedRoutingModule } from './shared.routing.module';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SafePipe,
    CardMovieComponent,
    AsociarEntidadesComponent,
    CapitalizePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SafePipe,
    CardMovieComponent,
    FormsModule,
  ]
})
export class SharedModule { }
