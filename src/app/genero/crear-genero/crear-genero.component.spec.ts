import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGeneroComponent } from './crear-genero.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

describe('CrearGeneroComponent', () => {
  let component: CrearGeneroComponent;
  let fixture: ComponentFixture<CrearGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, ToastrModule.forRoot(), ReactiveFormsModule],
      declarations: [CrearGeneroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario es inválido cuando está vacío', () => {
    expect(component.generoForm.valid).toBeFalsy();
  });

  it('Campo nombre es inválido cuando está vacío', () => {
    let nombre = component.generoForm.controls['nombre'];
    expect(nombre.valid).toBeFalsy();
  });

  it('Campo nombre es inválido cuando tiene menos de 3 caracteres', () => {
    let nombre = component.generoForm.controls['nombre'];
    nombre.setValue('AB');
    expect(nombre.valid).toBeFalsy();
  });

});
