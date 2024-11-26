import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActorService } from './actor.service';
import { Actor } from './actor.model';

describe('ActorService', () => {
  let service: ActorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActorService]
    });

    service = TestBed.inject(ActorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería listar actores', () => {
    const mockActores: Actor[] = [
      {
        id: '1',
        name: 'Robert Downey Jr.',
        photo: 'url_robert.jpg',
        nationality: 'American',
        birthDate: new Date('1965-04-04'),
        biography: 'Actor conocido por su papel de Iron Man en el UCM.',
        movies: []
      },
      {
        id: '2',
        name: 'Scarlett Johansson',
        photo: 'url_scarlett.jpg',
        nationality: 'American',
        birthDate: new Date('1984-11-22'),
        biography: 'Actriz conocida por su papel de Black Widow en el UCM.',
        movies: []
      }
    ];

    service.listarActores().subscribe(actores => {
      expect(actores).toEqual(mockActores);
    });

    const req = httpTestingController.expectOne('actors');
    expect(req.request.method).toBe('GET');
    req.flush(mockActores);
  });
});
