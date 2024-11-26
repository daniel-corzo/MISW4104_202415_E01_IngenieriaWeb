import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plataforma } from '../plataforma.model';
import { Subject, takeUntil } from 'rxjs';
import { PlataformaService } from '../plataforma.service';

@Component({
  selector: 'app-listado-plataformas',
  templateUrl: './listado-plataformas.component.html',
  styleUrl: './listado-plataformas.component.scss'
})
export class ListadoPlataformasComponent implements OnInit, OnDestroy {
  listadoPlataformas: Plataforma[] = [];
  plataformasPaginadas: Plataforma[] = [];
  unsubscribe$ = new Subject<void>();

  page: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;

  constructor(private plataformService: PlataformaService) {}


  ngOnInit(): void {
    this.plataformService.listarPlataformas()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(plataformas => {
      this.listadoPlataformas = plataformas;
      this.totalPages = Math.ceil(this.listadoPlataformas.length / this.itemsPerPage);
      this.updatePaginatedPlatforms();
    });
  }

  updatePaginatedPlatforms(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.plataformasPaginadas = this.listadoPlataformas.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.updatePaginatedPlatforms();
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.totalPages = Math.ceil(this.listadoPlataformas.length / this.itemsPerPage);
    this.page = 1;
    this.updatePaginatedPlatforms();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
