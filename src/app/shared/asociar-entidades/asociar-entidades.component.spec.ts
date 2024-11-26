import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AsociarEntidadesComponent } from './asociar-entidades.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CapitalizePipe } from '../pipes/capitalize.pipe'; // Asegúrate de importar el Pipe

describe('AsociarEntidadesComponent', () => {
  let component: AsociarEntidadesComponent;
  let fixture: ComponentFixture<AsociarEntidadesComponent>;
  let sharedService: jasmine.SpyObj<SharedService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    // Mock de SharedService y ToastrService
    const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['getData', 'linkEntities']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [
        AsociarEntidadesComponent,
        CapitalizePipe // Declara el Pipe aquí
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { queryParams: of({ firstEntity: 'platforms', secondEntity: 'movies' }) } },
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsociarEntidadesComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required validators', () => {
    expect(component.linkForm).toBeDefined();
    expect(component.linkForm.get('firstEntity')).toBeTruthy();
    expect(component.linkForm.get('secondEntity')).toBeTruthy();
    expect(component.linkForm.get('firstEntity')?.validator).toBeTruthy();
    expect(component.linkForm.get('secondEntity')?.validator).toBeTruthy();
  });

  it('should get query params and call sharedService to load entity lists', () => {
    sharedService.getData.and.returnValue(of([{ id: 1, name: 'Entity 1' }]));

    component.ngOnInit();

    expect(sharedService.getData).toHaveBeenCalledWith('platforms');
    expect(sharedService.getData).toHaveBeenCalledWith('movies');
    expect(component.firstEntityList.length).toBeGreaterThan(0);
    expect(component.secondEntityList.length).toBeGreaterThan(0);
  });

  it('should display error messages when form is invalid and submitted', () => {
    component.onSubmit();

    expect(component.linkForm.invalid).toBeTrue();
    expect(component.linkForm.get('firstEntity')?.errors?.['required']).toBeTruthy();
    expect(component.linkForm.get('secondEntity')?.errors?.['required']).toBeTruthy();
  });

  it('should submit the form if it is valid', fakeAsync(() => {
    sharedService.linkEntities.and.returnValue(of({}));

    component.linkForm.setValue({ firstEntity: '1', secondEntity: '2' });
    component.onSubmit();
    tick();

    expect(sharedService.linkEntities).toHaveBeenCalledWith('platforms', 'movies', '1', '2');
    expect(toastrService.success).toHaveBeenCalledWith('Entities linked successfully');
  }));

  it('should handle error when submission fails', fakeAsync(() => {
    sharedService.linkEntities.and.returnValue(throwError('Error linking entities'));

    component.linkForm.setValue({ firstEntity: '1', secondEntity: '2' });
    component.onSubmit();
    tick();

    expect(toastrService.error).toHaveBeenCalledWith('Error linking entities');
  }));
});
