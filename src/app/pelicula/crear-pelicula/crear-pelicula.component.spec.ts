import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPeliculaComponent } from './crear-pelicula.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PeliculaService } from '../pelicula.service';
import { GeneroService } from '../../genero/genero.service';
import { DirectorService } from '../../director/director.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Genero } from '../../genero/genero.model';
import { Director } from '../../director/director.model';
import { Pelicula } from '../pelicula.model';
import { Trailer } from '../trailer.model';

describe('CrearPeliculaComponent', () => {
  let component: CrearPeliculaComponent;
  let fixture: ComponentFixture<CrearPeliculaComponent>;
  let peliculaService: jasmine.SpyObj<PeliculaService>;
  let generoService: jasmine.SpyObj<GeneroService>;
  let directorService: jasmine.SpyObj<DirectorService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const peliculaServiceMock = jasmine.createSpyObj('PeliculaService', ['crearPelicula', 'crearTrailer']);
    const generoServiceMock = jasmine.createSpyObj('GeneroService', ['listarGeneros']);
    const directorServiceMock = jasmine.createSpyObj('DirectorService', ['listarDirectores']);
    const toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CrearPeliculaComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: PeliculaService, useValue: peliculaServiceMock },
        { provide: GeneroService, useValue: generoServiceMock },
        { provide: DirectorService, useValue: directorServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPeliculaComponent);
    component = fixture.componentInstance;
    peliculaService = TestBed.inject(PeliculaService) as jasmine.SpyObj<PeliculaService>;
    generoService = TestBed.inject(GeneroService) as jasmine.SpyObj<GeneroService>;
    directorService = TestBed.inject(DirectorService) as jasmine.SpyObj<DirectorService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    generoService.listarGeneros.and.returnValue(of([
      { id: '1', type: 'Action', movies: [] },
      { id: '2', type: 'Drama', movies: [] }
    ]));
    directorService.listarDirectores.and.returnValue(of([
      { id: '1', name: 'Christopher Nolan', photo: '', nationality: 'British', birthDate: new Date(), biography: '', movies: [] },
      { id: '2', name: 'Quentin Tarantino', photo: '', nationality: 'American', birthDate: new Date(), biography: '', movies: [] }
    ]));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.peliculaForm;
    expect(form).toBeDefined();
    expect(form.get('title')?.value).toBe('');
    expect(form.get('poster')?.value).toBe('');
    expect(form.get('duration')?.value).toBe('');
    expect(form.get('country')?.value).toBe('');
    expect(form.get('releaseDate')?.value).toBe('');
    expect(form.get('popularity')?.value).toBe('');
    expect(form.get('genre')?.value).toBe('');
    expect(form.get('director')?.value).toBe('');
    expect(form.get('trailerName')?.value).toBe('');
    expect(form.get('trailerUrl')?.value).toBe('');
    expect(form.get('trailerDuration')?.value).toBe('');
    expect(form.get('trailerChannel')?.value).toBe('');
  });

  it('should not submit the form if it is invalid', () => {
    component.onSubmit();
    expect(peliculaService.crearPelicula).not.toHaveBeenCalled();
    expect(peliculaService.crearTrailer).not.toHaveBeenCalled();
  });

  it('should submit the form if it is valid', () => {
    const form = component.peliculaForm;
    form.setValue({
      title: 'Inception',
      poster: 'https://example.com/poster.jpg',
      duration: 148,
      country: 'USA',
      releaseDate: '2010-07-16',
      popularity: 5,
      genre: JSON.stringify({ id: '1', type: 'Action', movies: [] }),
      director: JSON.stringify({ id: '1', name: 'Christopher Nolan', photo: '', nationality: 'British', birthDate: new Date(), biography: '', movies: [] }),
      trailerName: 'Inception Trailer',
      trailerUrl: 'https://example.com/trailer.mp4',
      trailerDuration: 120,
      trailerChannel: 'Warner Bros'
    });

    const mockTrailer: Trailer = {
      id: '1',
      name: 'Inception Trailer',
      url: 'https://example.com/trailer.mp4',
      duration: 120,
      channel: 'Warner Bros'
    };

    peliculaService.crearTrailer.and.returnValue(of(mockTrailer));
    peliculaService.crearPelicula.and.returnValue(of({} as Pelicula));

    component.onSubmit();

    expect(peliculaService.crearTrailer).toHaveBeenCalled();
    expect(peliculaService.crearPelicula).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Movie created succesfully', 'Success');
    expect(router.navigate).toHaveBeenCalledWith(['movies']);
  });

  it('should reset the form after submitting', () => {
    const form = component.peliculaForm;
    form.setValue({
      title: 'Inception',
      poster: 'https://example.com/poster.jpg',
      duration: 148,
      country: 'USA',
      releaseDate: '2010-07-16',
      popularity: 5,
      genre: JSON.stringify({ id: '1', type: 'Action', movies: [] }),
      director: JSON.stringify({ id: '1', name: 'Christopher Nolan', photo: '', nationality: 'British', birthDate: new Date(), biography: '', movies: [] }),
      trailerName: 'Inception Trailer',
      trailerUrl: 'https://example.com/trailer.mp4',
      trailerDuration: 120,
      trailerChannel: 'Warner Bros'
    });

    peliculaService.crearTrailer.and.returnValue(of({} as Trailer));
    peliculaService.crearPelicula.and.returnValue(of({} as Pelicula));

    component.onSubmit();

    expect(form.value).toEqual({
      title: null,
      poster: null,
      duration: null,
      country: null,
      releaseDate: null,
      popularity: null,
      genre: null,
      director: null,
      trailerName: null,
      trailerUrl: null,
      trailerDuration: null,
      trailerChannel: null
    });
  });
});
