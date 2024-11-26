import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleDirectorComponent } from './detalle-director.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DirectorService } from '../director.service';

describe('DetalleDirectorComponent', () => {
  let component: DetalleDirectorComponent;
  let fixture: ComponentFixture<DetalleDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleDirectorComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' }
            },
          },
        },
        {
          provide: DirectorService,
          useValue: {
            buscarDirectorPorId: (id: string) => of({
              id: '1',
              name: 'Christopher Nolan',
              birthdate: 'July 30, 1970',
              nationality: 'England, UK',
              photo: 'some-photo-url.jpg'
            })
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
