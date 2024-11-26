import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearDirectorComponent } from './crear-director.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DirectorService } from '../director.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CrearDirectorComponent', () => {
  let component: CrearDirectorComponent;
  let fixture: ComponentFixture<CrearDirectorComponent>;
  let directorServiceMock: any;
  let toastrServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock del DirectorService
    directorServiceMock = {
      crear: jasmine.createSpy('crear').and.returnValue(of({}))
    };

    // Mock del ToastrService
    toastrServiceMock = {
      success: jasmine.createSpy('success')
    };

    // Mock del Router
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [CrearDirectorComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DirectorService, useValue: directorServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CrearDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const directorForm = component.directorForm;
    expect(directorForm).toBeDefined();
    expect(directorForm.get('nombre')?.value).toBe('');
    expect(directorForm.get('foto')?.value).toBe('');
    expect(directorForm.get('nacionalidad')?.value).toBe('');
    expect(directorForm.get('fechaNacimiento')?.value).toBe('');
    expect(directorForm.get('biografia')?.value).toBe('');
  });

  it('should invalidate the form if required fields are empty', () => {
    const directorForm = component.directorForm;

    directorForm.get('nombre')?.setValue('');
    directorForm.get('foto')?.setValue('');
    directorForm.get('nacionalidad')?.setValue('');
    directorForm.get('fechaNacimiento')?.setValue('');
    directorForm.get('biografia')?.setValue('');

    expect(directorForm.valid).toBeFalse();
  });

  it('should validate that the birth date cannot be in the future', () => {
    const directorForm = component.directorForm;
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    directorForm.get('fechaNacimiento')?.setValue(futureDate.toISOString().split('T')[0]);

    fixture.detectChanges();

    const fechaNacimientoErrors = directorForm.get('fechaNacimiento')?.errors;
    expect(fechaNacimientoErrors).toBeDefined();
    expect(fechaNacimientoErrors?.['futureDate']).toBeTrue();
  });

  it('should call the DirectorService to create a director when form is valid', () => {
    const directorForm = component.directorForm;

    directorForm.get('nombre')?.setValue('Christopher Nolan');
    directorForm.get('foto')?.setValue('https://image.url/photo.jpg');
    directorForm.get('nacionalidad')?.setValue('British');
    directorForm.get('fechaNacimiento')?.setValue('1970-07-30');
    directorForm.get('biografia')?.setValue('Christopher Nolan is a British filmmaker.');

    component.onSubmit();

    expect(directorServiceMock.crear).toHaveBeenCalled();
    expect(toastrServiceMock.success).toHaveBeenCalledWith('Director created successfully', 'Success');
    expect(routerMock.navigate).toHaveBeenCalledWith(['directors']);
  });

  it('should not call the DirectorService if the form is invalid', () => {
    component.onSubmit();
    expect(directorServiceMock.crear).not.toHaveBeenCalled();
  });
});
