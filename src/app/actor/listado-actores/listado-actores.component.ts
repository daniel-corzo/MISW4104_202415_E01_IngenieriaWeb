import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../actor.model';
import { Subject, takeUntil } from 'rxjs';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-listado-actores',
  templateUrl: './listado-actores.component.html',
  styleUrl: './listado-actores.component.scss'
})
export class ListadoActoresComponent implements OnInit, OnDestroy {

  listadoActores!: Actor[];
  actoresPaginados!: Actor[];
  unsubscribe$ = new Subject<void>();

  page: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  constructor(private actorService: ActorService) {}


  ngOnInit(): void {
    this.actorService.listarActores()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(actors => {
      this.listadoActores = actors;
      this.totalPages = Math.ceil(this.listadoActores.length / this.itemsPerPage);
      this.updatePaginatedActors();
    });
  }

  updatePaginatedActors(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.actoresPaginados = this.listadoActores.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.updatePaginatedActors();
    }
  }

  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.totalPages = Math.ceil(this.listadoActores.length / this.itemsPerPage);
    this.page = 1;
    this.updatePaginatedActors();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
