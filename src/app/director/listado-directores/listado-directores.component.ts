import { Component, OnDestroy, OnInit } from '@angular/core';
import { Director } from '../director.model';
import { Subject, takeUntil } from 'rxjs';
import { DirectorService } from '../director.service';

@Component({
  selector: 'app-listado-directores',
  templateUrl: './listado-directores.component.html',
  styleUrl: './listado-directores.component.scss'
})
export class ListadoDirectoresComponent implements OnInit, OnDestroy {
  listadoDirectores: Director[] = [];
  directoresPaginados: Director[] = [];
  unsubscribe$ = new Subject<void>();

  page: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  constructor(private directorService: DirectorService) {}


  ngOnInit(): void {
    this.directorService.listarDirectores()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(directores => {
      this.listadoDirectores = directores;
      this.totalPages = Math.ceil(this.listadoDirectores.length / this.itemsPerPage);
      this.updatePaginatedDirectors();
    });
  }

  updatePaginatedDirectors(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.directoresPaginados = this.listadoDirectores.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.updatePaginatedDirectors();
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.totalPages = Math.ceil(this.listadoDirectores.length / this.itemsPerPage);
    this.page = 1;
    this.updatePaginatedDirectors();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}