import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GeneroService } from './genero.service';
import { Genero } from './genero.model';

describe('GeneroService', () => {
  let service: GeneroService;
  let httpMock: HttpTestingController;
  const endpoint = 'genres';

  const listaGenerosMock: Array<Genero> = [
    { id: '2018728d-9076-4f13-9863-d5f0ac1a3fe7', type: 'Genre 1', movies: [] },
    { id: '81b60fab-9358-4fef-89a1-b7baae77facd', type: 'Genre 2', movies: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeneroService]
    });
    
    service = TestBed.inject(GeneroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe ser verificado', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar informacion cuando exista', () => {
    service.listarGeneros().subscribe(genres => {
      expect(genres.length).toBe(2);
      expect(genres).toEqual(listaGenerosMock);
    });

    const req = httpMock.expectOne(endpoint);
    expect(req.request.method).toBe('GET');
    req.flush(listaGenerosMock);
  });

  it('debe retornar vacio cuando no exista informacion', () => {
    service.listarGeneros().subscribe(genres => {
      expect(genres.length).toBe(0);
    });

    const req = httpMock.expectOne(endpoint);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('debe retornar un error cuando falle la peticion', () => {
    service.listarGeneros().subscribe(
      () => fail('fallo'),
      error => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(endpoint);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Error'));
  });

  it('debe retornar informacion de un genero por id', () => {   
    const generoMock: Genero = { id: '2018728d-9076-4f13-9863-d5f0ac1a3fe7', type: 'Genre 1', movies: [] };

    service.buscarGeneroPorId('2018728d-9076-4f13-9863-d5f0ac1a3fe7').subscribe(genre => {
      expect(genre).toEqual(generoMock);
    });

    const req = httpMock.expectOne(`${endpoint}/2018728d-9076-4f13-9863-d5f0ac1a3fe7`);
    expect(req.request.method).toBe('GET');
    req.flush(generoMock);
  });

  it('debe retornar un error cuando falle la peticion de un genero por id', () => {
    service.buscarGeneroPorId('00000000-0000-0000-0000-00000000').subscribe(
      () => fail('fallo'),
      error => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(`${endpoint}/00000000-0000-0000-0000-00000000`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Error'));
  });
});
