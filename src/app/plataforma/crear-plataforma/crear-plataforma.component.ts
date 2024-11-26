import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlataformaService } from '../plataforma.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-plataforma',
  templateUrl: './crear-plataforma.component.html',
  styleUrl: './crear-plataforma.component.scss'
})
export class CrearPlataformaComponent {
  plataformaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private plataformaService: PlataformaService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.plataformaForm = this.fb.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.plataformaForm.valid) {
      return;
    }

    const crearPlataformaRequest = {
      name: this.plataformaForm.get('nombre')?.value,
      url: this.plataformaForm.get('url')?.value,
    };

    this.plataformaService
      .crear(crearPlataformaRequest)
      .subscribe(response => {
        this.toastrService.success('Platform created successfully', 'Success');
        this.plataformaForm.reset();
        this.router.navigate(['platforms']);
      });
  }
}
