import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoDirectoresComponent } from './listado-directores.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { DirectorService } from '../director.service';
import { of } from 'rxjs';
import { Director } from '../director.model';
import { ActivatedRoute } from '@angular/router';

describe('ListadoDirectoresComponent', () => {
  let component: ListadoDirectoresComponent;
  let fixture: ComponentFixture<ListadoDirectoresComponent>;
  let directorService: DirectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoDirectoresComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        DirectorService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            queryParams: of({}),
            snapshot: { params: {} }
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoDirectoresComponent);
    component = fixture.componentInstance;
    directorService = TestBed.inject(DirectorService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load directors on init', () => {
    const mockDirectors: Director[] = [
      { id: '1', name: 'Christopher Nolan', birthDate: new Date('1970-07-30'), nationality: 'England', biography: 'Christopher', movies: [], photo: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg' },
      { id: '2', name: 'Quentin Tarantino', birthDate: new Date('1963-03-27'), nationality: 'USA', biography: 'Christopher', movies: [], photo: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg' }
    ];

    spyOn(directorService, 'listarDirectores').and.returnValue(of(mockDirectors));

    component.ngOnInit();

    expect(component.listadoDirectores).toEqual(mockDirectors);
  });
});
