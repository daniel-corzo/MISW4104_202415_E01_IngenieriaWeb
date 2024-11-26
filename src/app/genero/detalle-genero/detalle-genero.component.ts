import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GeneroService } from '../genero.service';
import { Genero } from '../genero.model';


@Component({
  selector: 'app-detalle-genero',
  templateUrl: './detalle-genero.component.html',
})
export class DetalleGeneroComponent implements OnInit, OnDestroy {
  genero?: Genero;
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private generoService: GeneroService) { }

  ngOnInit(): void {

    this.route.params.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(params => {
        const idGenero = params['id'];
        return this.generoService.buscarGeneroPorId(idGenero);
      })
    ).subscribe(genero => {
      this.genero = genero;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
