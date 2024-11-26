import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pelicula } from '../pelicula.model';
import { PeliculaService } from '../pelicula.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.scss'
})
export class ListadoPeliculasComponent implements OnInit, OnDestroy {

  listadoPeliculas!: Pelicula[];
  peliculasPaginadas!: Pelicula[];
  unsubscribe$ = new Subject<void>();

  page: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  constructor(private peliculaService: PeliculaService) {}


  ngOnInit(): void {
    this.peliculaService.listarPeliculas()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(peliculas => {
      this.listadoPeliculas = peliculas;
      this.totalPages = Math.ceil(this.listadoPeliculas.length / this.itemsPerPage);
      this.updatePaginatedMovies();
    });
  }

  updatePaginatedMovies(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.peliculasPaginadas = this.listadoPeliculas.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.updatePaginatedMovies();
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.totalPages = Math.ceil(this.listadoPeliculas.length / this.itemsPerPage);
    this.page = 1;
    this.updatePaginatedMovies();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
