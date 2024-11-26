import { Component, OnDestroy, OnInit } from '@angular/core';
import { Director } from '../director.model';
import { Subject, takeUntil } from 'rxjs';
import { DirectorService } from '../director.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-director',
  templateUrl: './detalle-director.component.html',
  styleUrl: './detalle-director.component.scss'
})
export class DetalleDirectorComponent implements OnInit, OnDestroy {
  director?: Director;
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private directorService: DirectorService
  ) { }

  ngOnInit(): void {
    const idDirector = this.route.snapshot.params['id'];
    
    this.directorService.buscarDirectorPorId(idDirector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(director => {
        this.director = director;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
