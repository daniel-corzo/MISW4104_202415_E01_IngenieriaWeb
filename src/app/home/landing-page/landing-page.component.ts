import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pelicula } from '../../pelicula/pelicula.model';
import { Subject, takeUntil } from 'rxjs';
import { PeliculaService } from '../../pelicula/pelicula.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, OnDestroy {
  listadoPeliculas: Pelicula[] = [];
  listadoPeliculasPopulares: Pelicula[] = [];
  listadoPeliculasScroll: Pelicula[] = [];
  isLoading = false;
  page = 1;
  limit = 12;
  unsubscribe$ = new Subject<void>();

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    this.peliculaService.listarPeliculas()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(peliculas => {
        this.listadoPeliculas = peliculas;
        this.listadoPeliculasPopulares = peliculas.filter(pelicula => pelicula.popularity >= 4);
        const startIndex = (this.page - 1) * this.limit;
        const endIndex = this.page * this.limit;
        this.listadoPeliculasScroll = this.listadoPeliculasPopulares.slice(startIndex, endIndex);
        this.page++;
      });
  }

  loadPeliculas(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    const startIndex = (this.page - 1) * this.limit;
    const endIndex = this.page * this.limit;
    const peliculasParaMostrar = this.listadoPeliculasPopulares.slice(startIndex, endIndex);
    this.listadoPeliculasScroll = [...this.listadoPeliculasPopulares, ...peliculasParaMostrar];
    this.isLoading = false;
    this.page++;
  }

  onScroll(): void {
    this.loadPeliculas();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
