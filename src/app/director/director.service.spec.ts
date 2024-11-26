import { TestBed } from '@angular/core/testing';
import { DirectorService } from './director.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Director } from './director.model';

describe('DirectorService', () => {
  let service: DirectorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DirectorService]
    });
    service = TestBed.inject(DirectorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call the correct URL when buscarDirectorPorId is called', () => {
    const testId = '1';
    const mockDirector: Director = {
      id: '1',
      name: 'Christopher Nolan',
      birthDate: new Date('1970-07-30'),
      nationality: 'England, UK',
      photo: 'some-photo-url.jpg',
      biography: '',
      movies: []
    };

    service.buscarDirectorPorId(testId).subscribe((director) => {
      expect(director).toEqual(mockDirector);
    });

    const req = httpTestingController.expectOne(`directors/${testId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDirector);
  });
});
