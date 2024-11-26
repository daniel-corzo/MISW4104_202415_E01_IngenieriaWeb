import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoPlataformasComponent } from './listado-plataformas.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlataformaService } from '../plataforma.service';
import { of } from 'rxjs';
import { Plataforma } from '../plataforma.model';
import { ActivatedRoute } from '@angular/router';

describe('ListadoPlataformasComponent', () => {
  let component: ListadoPlataformasComponent;
  let fixture: ComponentFixture<ListadoPlataformasComponent>;
  let plataformaService: PlataformaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoPlataformasComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        PlataformaService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '123' }
            }
          },
        },
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(ListadoPlataformasComponent);
    component = fixture.componentInstance;
    plataformaService = TestBed.inject(PlataformaService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load platforms on init', () => {
    const mockPlataformas: Plataforma[] = [
      { id: '1', name: 'Netflix', url: 'https://netflix.com', movies: [] },
      { id: '2', name: 'Amazon Prime', url: 'https://amazon-primer.com', movies: [] }
    ];

    spyOn(plataformaService, 'listarPlataformas').and.returnValue(of(mockPlataformas));

    component.ngOnInit();

    expect(component.listadoPlataformas).toEqual(mockPlataformas);
  });
});
