import { Component, OnDestroy, OnInit } from '@angular/core';
import { Genero } from '../../genero/genero.model';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { GeneroService } from '../../genero/genero.service';
import { EventBusService } from '../../common/event-bus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  listadoGeneros: Genero[] = [];
  unsubscribe$ = new Subject<void>();
  private eventSubscription: Subscription;

  constructor(
    private generoService: GeneroService,
    private eventBus: EventBusService) {
    this.eventSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadGeneros();

    this.eventSubscription = this.eventBus.on('genre-created').subscribe(() => {
      this.loadGeneros();
    });
  }

  loadGeneros(): void {
    this.generoService.listarGeneros()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(generos => {
        this.listadoGeneros = generos;
      });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
