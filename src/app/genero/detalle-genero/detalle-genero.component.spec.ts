import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { GeneroService } from '../genero.service';
import { DetalleGeneroComponent } from './detalle-genero.component';
import { Genero } from '../genero.model';
import { SharedModule } from '../../shared/shared.module';

describe('DetalleGeneroComponent', () => {
  let component: DetalleGeneroComponent;
  let fixture: ComponentFixture<DetalleGeneroComponent>;
  let generoServiceMock: jasmine.SpyObj<GeneroService>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  const mockGenero: Genero = {
    id: '1',
    type: 'Acción',
    movies: [
      { id: '1', title: 'Movie 1', poster: 'poster1.jpg', duration: 120, country: 'USA', releaseDate: new Date('2022-01-01'), popularity: 8.5 },
      { id: '2', title: 'Movie 2', poster: 'poster2.jpg', duration: 90, country: 'UK', releaseDate: new Date('2023-01-01'), popularity: 7.0 },
    ],
  };

  beforeEach(async () => {
    generoServiceMock = jasmine.createSpyObj('GeneroService', ['buscarGeneroPorId']);
    activatedRouteMock = {
      params: of({ id: '1' }),
    };

    await TestBed.configureTestingModule({
      declarations: [DetalleGeneroComponent],
      providers: [
        { provide: GeneroService, useValue: generoServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleGeneroComponent);
    component = fixture.componentInstance;

    generoServiceMock.buscarGeneroPorId.and.returnValue(of(mockGenero));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the genre on initialization', () => {

    const expectedGenero: Genero = mockGenero;
    generoServiceMock.buscarGeneroPorId.and.returnValue(of(expectedGenero));

    component.ngOnInit();

    expect(generoServiceMock.buscarGeneroPorId).toHaveBeenCalledWith('1');
    expect(component.genero).toEqual(expectedGenero);

  });

  it('should complete the unsubscribe$ Subject on component destruction', () => {
    spyOn(component.unsubscribe$, 'next').and.callThrough();
    spyOn(component.unsubscribe$, 'complete').and.callThrough();

    component.ngOnDestroy();

    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
});
