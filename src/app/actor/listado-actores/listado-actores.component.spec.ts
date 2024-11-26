import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoActoresComponent } from './listado-actores.component';
import { ActorService } from '../actor.service';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Actor } from '../actor.model';
import { Pelicula } from '../../pelicula/pelicula.model';

describe('ListadoActoresComponent', () => {
  let component: ListadoActoresComponent;
  let fixture: ComponentFixture<ListadoActoresComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  const mockMovies: Pelicula[] = [
    { id: '1', title: 'Movie 1', poster: 'poster_url_1', duration: 120, country: 'Country 1', releaseDate: new Date('2020-01-01'), popularity: 8.5 },
    { id: '2', title: 'Movie 2', poster: 'poster_url_2', duration: 110, country: 'Country 2', releaseDate: new Date('2021-05-01'), popularity: 7.9 }
  ];

  const mockActors: Actor[] = Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Actor ${i + 1}`,
    photo: `url_photo_${i + 1}`,
    nationality: `Country ${i + 1}`,
    birthDate: new Date('1980-01-01'),
    biography: `Biography of Actor ${i + 1}`,
    movies: mockMovies
  }));

  beforeEach(async () => {
    const actorServiceMock = jasmine.createSpyObj('ActorService', ['listarActores']);
    actorServiceMock.listarActores.and.returnValue(of(mockActors));

    await TestBed.configureTestingModule({
      declarations: [ListadoActoresComponent],
      providers: [
        { provide: ActorService, useValue: actorServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoActoresComponent);
    component = fixture.componentInstance;
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load actors on initialization and set paginated actors', () => {
    component.ngOnInit();
    expect(actorServiceSpy.listarActores).toHaveBeenCalled();
    expect(component.listadoActores.length).toBe(20);
    expect(component.totalPages).toBe(Math.ceil(20 / component.itemsPerPage));
    expect(component.actoresPaginados.length).toBe(component.itemsPerPage);
  });

  it('should update paginated actors when page is changed', () => {
    component.ngOnInit();
    component.goToPage(2);
    expect(component.page).toBe(2);
    const startIndex = (component.page - 1) * component.itemsPerPage;
    const endIndex = startIndex + component.itemsPerPage;
    expect(component.actoresPaginados).toEqual(mockActors.slice(startIndex, endIndex));
  });

  it('should update items per page and reset pagination', () => {
    component.ngOnInit();
    component.changeItemsPerPage(8);
    expect(component.itemsPerPage).toBe(8);
    expect(component.page).toBe(1);
    expect(component.totalPages).toBe(Math.ceil(mockActors.length / 8));
    expect(component.actoresPaginados.length).toBe(8);
  });

  it('should unsubscribe from observable on component destroy', () => {
    const unsubscribeSpy = spyOn(component.unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
