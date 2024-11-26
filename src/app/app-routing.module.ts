import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'directors', loadChildren: () => import('./director/director.module').then(m => m.DirectorModule) },
  { path: 'platforms', loadChildren:() => import('./plataforma/plataforma.module').then(m => m.PlataformaModule) },
  { path: 'actors', loadChildren:() => import('./actor/actor.module').then(m => m.ActorModule) },
  { path: 'movies', loadChildren:() => import('./pelicula/pelicula.module').then(m => m.PeliculaModule) },
  { path: 'genres', loadChildren:() => import('./genero/genero.module').then(m => m.GeneroModule) },
  { path: 'shared', loadChildren:() => import('./shared/shared.module').then(m => m.SharedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }