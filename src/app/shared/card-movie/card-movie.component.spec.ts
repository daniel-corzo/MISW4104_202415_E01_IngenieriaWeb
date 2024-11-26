import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMovieComponent } from './card-movie.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardMovieComponent', () => {
  let component: CardMovieComponent;
  let fixture: ComponentFixture<CardMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardMovieComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CardMovieComponent);
    component = fixture.componentInstance;

    component.pelicula = {
      id: '1',
      title: 'Inception',
      poster: 'https://image.url/poster.jpg',
      releaseDate: new Date('1965-04-04'),
      popularity: 5,
      duration: 120,
      country: 'USA',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
