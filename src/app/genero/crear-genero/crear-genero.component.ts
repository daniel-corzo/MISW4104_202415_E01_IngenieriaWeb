import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nombreGeneroValidator } from '../validators/genero.validators';
import { GeneroService } from '../genero.service';
import { CrearGeneroRequest } from './crear-genero.request-model';
import { ToastrService } from 'ngx-toastr';
import { EventBusService } from '../../common/event-bus.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrl: './crear-genero.component.scss'
})
export class CrearGeneroComponent {
  generoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private generoService: GeneroService,
    private toastrService: ToastrService,
    private eventBus: EventBusService) {
    this.generoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)], [nombreGeneroValidator(this.generoService)]]
    });
  }

  onSubmit(): void {
    if (!this.generoForm.valid) {
      return;
    }

    const crearGeneroRequest: CrearGeneroRequest = { type: this.generoForm.get('nombre')?.value }; 
   
    this.generoService
      .crear(crearGeneroRequest)
      .subscribe(response => {
        this.toastrService.success('Genre created succesfully', 'Success'); 
        this.generoForm.reset();
        this.eventBus.emit('genre-created');
      });
  }
}
