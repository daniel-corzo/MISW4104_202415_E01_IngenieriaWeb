import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePlataformaComponent } from './detalle-plataforma.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { PlataformaService } from '../plataforma.service';
import { of } from 'rxjs';

describe('DetallePlataformaComponent', () => {
  let component: DetallePlataformaComponent;
  let fixture: ComponentFixture<DetallePlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePlataformaComponent],
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
          provide: PlataformaService,
          useValue: {
            buscarPlataformaPorId: (id: string) => of({
              id: '1',
              name: 'Netflix',
              url: 'https://www.netflix.com/',
              movies: []
            })
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallePlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
