import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { ListadoPeliculasComponent } from './listado-peliculas.component';
import { PeliculaService } from '../pelicula.service';
import { Pelicula } from '../pelicula.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListadoPeliculasComponent', () => {
  let component: ListadoPeliculasComponent;
  let fixture: ComponentFixture<ListadoPeliculasComponent>;
  let peliculaServiceSpy: jasmine.SpyObj<PeliculaService>;

  const mockPeliculas: Pelicula[] = [
    {
      id: '1',
      title: 'Pelicula 1',
      poster: 'url1',
      duration: 120,
      country: 'Country 1',
      releaseDate: new Date('2022-01-01'),
      popularity: 90
    },
    {
      id: '2',
      title: 'Pelicula 2',
      poster: 'url2',
      duration: 130,
      country: 'Country 2',
      releaseDate: new Date('2023-01-01'),
      popularity: 85
    }
  ];

  beforeEach(async () => {
    const peliculaServiceMock = jasmine.createSpyObj('PeliculaService', ['listarPeliculas']);
    peliculaServiceMock.listarPeliculas.and.returnValue(of(mockPeliculas));

    await TestBed.configureTestingModule({
      declarations: [ListadoPeliculasComponent],
      providers: [
        { provide: PeliculaService, useValue: peliculaServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPeliculasComponent);
    component = fixture.componentInstance;
    peliculaServiceSpy = TestBed.inject(PeliculaService) as jasmine.SpyObj<PeliculaService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call listarPeliculas in ngOnInit and assign listadoPeliculas', () => {
    component.ngOnInit();
    expect(peliculaServiceSpy.listarPeliculas).toHaveBeenCalled();
    expect(component.listadoPeliculas).toEqual(mockPeliculas);
  });

  it('should complete unsubscribe$ in ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
