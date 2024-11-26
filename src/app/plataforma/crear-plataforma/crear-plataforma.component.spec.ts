import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPlataformaComponent } from './crear-plataforma.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlataformaService } from '../plataforma.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CrearPlataformaComponent', () => {
  let component: CrearPlataformaComponent;
  let fixture: ComponentFixture<CrearPlataformaComponent>;
  let plataformaServiceMock: any;
  let toastrServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    plataformaServiceMock = {
      crear: jasmine.createSpy('crear').and.returnValue(of({}))
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [CrearPlataformaComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PlataformaService, useValue: plataformaServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const plataformaForm = component.plataformaForm;
    expect(plataformaForm).toBeDefined();
    expect(plataformaForm.get('nombre')?.value).toBe('');
    expect(plataformaForm.get('url')?.value).toBe('');
  });

  it('should invalidate the form if required fields are empty', () => {
    const plataformaForm = component.plataformaForm;

    plataformaForm.get('nombre')?.setValue('');
    plataformaForm.get('url')?.setValue('');

    expect(plataformaForm.valid).toBeFalse();
  });

  it('should validate that the form is valid when all fields are filled', () => {
    const plataformaForm = component.plataformaForm;

    plataformaForm.get('nombre')?.setValue('Netflix');
    plataformaForm.get('url')?.setValue('https://www.netflix.com');

    expect(plataformaForm.valid).toBeTrue();
  });

  it('should call the PlataformaService to create a platform when form is valid', () => {
    const plataformaForm = component.plataformaForm;

    plataformaForm.get('nombre')?.setValue('Hulu');
    plataformaForm.get('url')?.setValue('https://www.hulu.com');

    component.onSubmit();

    expect(plataformaServiceMock.crear).toHaveBeenCalledWith({
      name: 'Hulu',
      url: 'https://www.hulu.com'
    });
    expect(toastrServiceMock.success).toHaveBeenCalledWith('Platform created successfully', 'Success');
    expect(routerMock.navigate).toHaveBeenCalledWith(['platforms']);
  });

  it('should not call the PlataformaService if the form is invalid', () => {
    component.onSubmit();
    expect(plataformaServiceMock.crear).not.toHaveBeenCalled();
  });
});