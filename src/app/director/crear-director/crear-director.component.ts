import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectorService } from '../director.service';
import { ToastrService } from 'ngx-toastr';
import { CrearDirectorRequest } from './crear-director.request-model';
import { futureDateValidator } from '../validators/director.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-director',
  templateUrl: './crear-director.component.html',
  styleUrl: './crear-director.component.scss'
})
export class CrearDirectorComponent {
  directorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private directorService: DirectorService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.directorForm = this.fb.group({
      nombre: ['', Validators.required],
      foto: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, futureDateValidator]],
      biografia: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.directorForm.valid) {
      return;
    }

    const crearDirectorRequest: CrearDirectorRequest = {
      name: this.directorForm.get('nombre')?.value,
      photo: this.directorForm.get('foto')?.value,
      nationality: this.directorForm.get('nacionalidad')?.value,
      birthDate: this.directorForm.get('fechaNacimiento')?.value,
      biography: this.directorForm.get('biografia')?.value
    };

    this.directorService
      .crear(crearDirectorRequest)
      .subscribe(response => {
        this.toastrService.success('Director created successfully', 'Success');
        this.directorForm.reset();
        this.router.navigate(['directors']);
      });
  }
}
