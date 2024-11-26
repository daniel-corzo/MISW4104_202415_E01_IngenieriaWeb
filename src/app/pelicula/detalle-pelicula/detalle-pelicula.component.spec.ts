import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../pelicula.service';
import { DetallePeliculaComponent } from './detalle-pelicula.component';
import { Pelicula } from '../pelicula.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('DetallePeliculaComponent', () => {
  let component: DetallePeliculaComponent;
  let fixture: ComponentFixture<DetallePeliculaComponent>;
  let peliculaServiceSpy: jasmine.SpyObj<PeliculaService>;

  const mockMovie: Pelicula = {
    id: '1',
    title: 'Sample Movie',
    poster: 'url_poster',
    duration: 120,
    country: 'Country',
    releaseDate: new Date('2023-01-01'),
    popularity: 85,
    reviews: []
  };

  beforeEach(async () => {
    const activatedRouteMock = { snapshot: { params: { id: '1' } } };
    const peliculaServiceMock = jasmine.createSpyObj('PeliculaService', ['detallePelicula', 'crearReview']);
    peliculaServiceMock.detallePelicula.and.returnValue(of(mockMovie));
    peliculaServiceMock.crearReview.and.returnValue(of(mockMovie));

    await TestBed.configureTestingModule({
      declarations: [DetallePeliculaComponent],
      imports: [ToastrModule.forRoot(), ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PeliculaService, useValue: peliculaServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePeliculaComponent);
    component = fixture.componentInstance;
    peliculaServiceSpy = TestBed.inject(PeliculaService) as jasmine.SpyObj<PeliculaService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the movie with the given ID and assign it to movie', () => {
    component.ngOnInit();
    expect(peliculaServiceSpy.detallePelicula).toHaveBeenCalledWith('1');
    expect(component.movie).toEqual(mockMovie);
  });

  it('should unsubscribe from observable on component destroy', () => {
    component.ngOnInit();
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should add a review to the movie', () => {
    component.ngOnInit();
    const review = { text: 'Great movie', score: 5, creator: 'John Doe' };
    component.reviewForm.setValue(review);
    component.onSubmit();
    expect(peliculaServiceSpy.crearReview).toHaveBeenCalledWith('1', review);
  });

  it('should reset the review form after adding a review', () => {
    component.ngOnInit();
    const review = { text: 'Great movie', score: 5, creator: 'John Doe' };
    component.reviewForm.setValue(review);
    component.onSubmit();
    expect(component.reviewForm.value).toEqual({ text: null, score: null, creator: null });
  });
});
