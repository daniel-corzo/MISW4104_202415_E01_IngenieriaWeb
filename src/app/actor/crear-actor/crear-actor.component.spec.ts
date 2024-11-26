import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearActorComponent } from './crear-actor.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActorService } from '../actor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CrearActorComponent', () => {
  let component: CrearActorComponent;
  let fixture: ComponentFixture<CrearActorComponent>;
  let actorService: jasmine.SpyObj<ActorService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const actorServiceMock = jasmine.createSpyObj('ActorService', ['crear']);
    const toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CrearActorComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: ActorService, useValue: actorServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearActorComponent);
    component = fixture.componentInstance;
    actorService = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.actorForm;
    expect(form).toBeDefined();
    expect(form.get('nombre')?.value).toBe('');
    expect(form.get('foto')?.value).toBe('');
    expect(form.get('nacionalidad')?.value).toBe('');
    expect(form.get('fechaNacimiento')?.value).toBe('');
    expect(form.get('biografia')?.value).toBe('');
  });

  it('should not submit the form if it is invalid', () => {
    component.onSubmit();
    expect(actorService.crear).not.toHaveBeenCalled();
  });

  it('should submit the form if it is valid', () => {
    const form = component.actorForm;
    form.setValue({
      nombre: 'John Doe',
      foto: 'https://example.com/photo.jpg',
      nacionalidad: 'American',
      fechaNacimiento: '1990-01-01',
      biografia: 'An actor biography'
    });

    actorService.crear.and.returnValue(of({
      id: '1',
      name: 'John Doe',
      photo: 'https://example.com/photo.jpg',
      nationality: 'American',
      birthDate: new Date('1990-01-01'),
      biography: 'An actor biography',
      movies: []
    }));

    component.onSubmit();

    expect(actorService.crear).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Actor created successfully', 'Success');
    expect(router.navigate).toHaveBeenCalledWith(['actors']);
  });

  it('should reset the form after submitting', () => {
    const form = component.actorForm;
    form.setValue({
      nombre: 'John Doe',
      foto: 'https://example.com/photo.jpg',
      nacionalidad: 'American',
      fechaNacimiento: '1990-01-01',
      biografia: 'An actor biography'
    });

    actorService.crear.and.returnValue(of({
      id: '1',
      name: 'John Doe',
      photo: 'https://example.com/photo.jpg',
      nationality: 'American',
      birthDate: new Date('1990-01-01'),
      biography: 'An actor biography',
      movies: []
    }));

    component.onSubmit();

    expect(form.value).toEqual({
      nombre: null,
      foto: null,
      nacionalidad: null,
      fechaNacimiento: null,
      biografia: null
    });
  });
});
