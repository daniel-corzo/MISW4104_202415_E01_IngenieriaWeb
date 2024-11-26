import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

describe('SharedService', () => {
  let service: SharedService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService]
    });

    service = TestBed.inject(SharedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes después de cada prueba
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData() and return the correct data', () => {
    const mockData = [{ id: 1, name: 'Entity 1' }];
    const entityName = 'testEntity';

    service.getData(entityName).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(entityName);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call linkEntities() and make a POST request', () => {
    const firstEntity = 'platforms';
    const secondEntity = 'movies';
    const valueFirstEntity = '1';
    const valueSecondEntity = '2';
    const mockResponse = { success: true };

    service.linkEntities(firstEntity, secondEntity, valueFirstEntity, valueSecondEntity).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${firstEntity}/${valueFirstEntity}/${secondEntity}/${valueSecondEntity}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
