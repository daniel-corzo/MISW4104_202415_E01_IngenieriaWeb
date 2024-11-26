import { TestBed } from '@angular/core/testing';
import { PlataformaService } from './plataforma.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Plataforma } from './plataforma.model';

describe('PlataformaService', () => {
  let service: PlataformaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlataformaService]
    });

    service = TestBed.inject(PlataformaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve platform by id', () => {
    const mockPlataforma: Plataforma = {
      id: '123',
      name: 'Netflix',
      url: 'https://www.netflix.com',
      movies: []
    };

    service.buscarPlataformaPorId('123').subscribe((plataforma) => {
      expect(plataforma).toEqual(mockPlataforma);
    });

    const req = httpMock.expectOne('platforms/123');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlataforma);
  });
});
