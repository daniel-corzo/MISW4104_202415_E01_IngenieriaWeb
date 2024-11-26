import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActorService } from '../actor.service';
import { CrearActorRequest } from './crear-actor.request-model';
import { futureDateValidator } from '../../director/validators/director.validators';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.scss']
})
export class CrearActorComponent {

  actorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private actorService: ActorService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.actorForm = this.fb.group({
      nombre: ['', Validators.required],
      foto: ['', [Validators.required, Validators.pattern(reg)]],
      nacionalidad: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, futureDateValidator]],
      biografia: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.actorForm.valid) {
      return;
    }

    const crearActorRequest: CrearActorRequest = {
      name: this.actorForm.get('nombre')?.value,
      photo: this.actorForm.get('foto')?.value,
      nationality: this.actorForm.get('nacionalidad')?.value,
      birthDate: this.actorForm.get('fechaNacimiento')?.value,
      biography: this.actorForm.get('biografia')?.value
    };

    this.actorService
      .crear(crearActorRequest)
      .subscribe(() => {
        this.toastrService.success('Actor created successfully', 'Success');
        this.actorForm.reset();
        this.router.navigate(['actors']);
      });
  }


}
