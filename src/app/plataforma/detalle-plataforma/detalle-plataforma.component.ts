import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plataforma } from '../plataforma.model';
import { Subject, takeUntil } from 'rxjs';
import { PlataformaService } from '../plataforma.service';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from '../../pelicula/pelicula.model';

@Component({
  selector: 'app-detalle-plataforma',
  templateUrl: './detalle-plataforma.component.html',
  styleUrl: './detalle-plataforma.component.scss'
})
export class DetallePlataformaComponent implements OnInit, OnDestroy {
  plataforma?: Plataforma;
  peliculasPaginadas: Pelicula[] = [];
  unsubscribe$ = new Subject<void>();

  page: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private plataformaService: PlataformaService
  ) {}

  ngOnInit(): void {
    const idPlataforma = this.route.snapshot.params['id'];

    this.plataformaService.buscarPlataformaPorId(idPlataforma)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(plataforma => {
        this.plataforma = plataforma;
        this.totalPages = Math.ceil(this.plataforma.movies.length / this.itemsPerPage);
        this.updatePaginatedMovies();
      });
  }

  updatePaginatedMovies(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.peliculasPaginadas = this.plataforma?.movies ? this.plataforma.movies.slice(startIndex, endIndex) : [];
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.updatePaginatedMovies();
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.totalPages = this.plataforma ? Math.ceil(this.plataforma.movies.length / this.itemsPerPage) : 0;
    this.page = 1;
    this.updatePaginatedMovies();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
