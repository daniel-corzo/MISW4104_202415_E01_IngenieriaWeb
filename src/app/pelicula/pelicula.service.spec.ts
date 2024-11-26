import { TestBed } from '@angular/core/testing';

import { PeliculaService } from './pelicula.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PeliculaService', () => {
  let service: PeliculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PeliculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
