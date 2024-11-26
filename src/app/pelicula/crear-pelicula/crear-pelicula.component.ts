import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CrearPeliculaRequest } from './crear-pelicula.request-model';
import { PeliculaService } from '../pelicula.service';
import { GeneroService } from '../../genero/genero.service';
import { DirectorService } from '../../director/director.service';
import { Genero } from '../../genero/genero.model';
import { Director } from '../../director/director.model';
import { Pelicula } from '../pelicula.model';
import { Trailer } from '../trailer.model';
import { CrearTrailerRequest } from './crear-trailer.request-model';


@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.scss']
})
export class CrearPeliculaComponent {

  peliculaForm: FormGroup;
  listaGeneros$: Observable<Genero[]> = this.generoService.listarGeneros();
  listaDirectores$: Observable<Director[]> = this.directorService.listarDirectores();

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private generoService: GeneroService,
    private directorService: DirectorService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.peliculaForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      poster: ['', [Validators.required, Validators.pattern(reg)]],
      duration: ['', [Validators.required, Validators.min(1)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      releaseDate: ['', [Validators.required]],
      popularity: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      genre: ['', [Validators.required]],
      director: ['', [Validators.required]],
      trailerName: ['', [Validators.required]],
      trailerUrl: ['', [Validators.required, Validators.pattern(reg)]],
      trailerDuration : ['', [Validators.required, Validators.min(1)]],
      trailerChannel: ['', [Validators.required]]
    });
  }

  parseJsonToString(value: any): string {
    return JSON.stringify(value);
  }

  onSubmit(): void {
    if (!this.peliculaForm.valid) {
      return;
    }

    const crearPeliculaRequest: CrearPeliculaRequest = { 
      title: this.peliculaForm.get('title')?.value,
      poster: this.peliculaForm.get('poster')?.value,
      duration: this.peliculaForm.get('duration')?.value,
      country: this.peliculaForm.get('country')?.value,
      releaseDate: this.peliculaForm.get('releaseDate')?.value,
      popularity: this.peliculaForm.get('popularity')?.value,
      genre: JSON.parse(this.peliculaForm.get('genre')?.value),
      director: JSON.parse(this.peliculaForm.get('director')?.value),
      youtubeTrailer: undefined
    }; 

    const crearTrailerRequest: CrearTrailerRequest = {
      name: this.peliculaForm.get('trailerName')?.value,
      url: this.peliculaForm.get('trailerUrl')?.value,
      duration: this.peliculaForm.get('trailerDuration')?.value,
      channel: this.peliculaForm.get('trailerChannel')?.value
    }

    this.trailerRequest(crearTrailerRequest).pipe(
      switchMap(trailer => {
        crearPeliculaRequest.youtubeTrailer = trailer;
        return this.peliculaRequest(crearPeliculaRequest);
      })
    ).subscribe(() => {
        this.toastrService.success('Movie created succesfully', 'Success'); 
        this.peliculaForm.reset();
        this.router.navigate(['movies']);
    });

  }

  trailerRequest(crearTrailerRequest: CrearTrailerRequest): Observable<Trailer> {
    return this.peliculaService.crearTrailer(crearTrailerRequest);
  }
  
  peliculaRequest(crearPeliculaRequest: CrearPeliculaRequest): Observable<Pelicula> {
    return this.peliculaService.crearPelicula(crearPeliculaRequest);
  }

}
