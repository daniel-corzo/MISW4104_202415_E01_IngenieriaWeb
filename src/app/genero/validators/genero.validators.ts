import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { GeneroService } from '../genero.service';

export function nombreGeneroValidator(generoService: GeneroService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return generoService.listarGeneros().pipe(
      debounceTime(500),
      map((generos) => {
        const nombreExiste = generos.some(genero => genero.type.toLowerCase() === control.value.toLowerCase());
        return nombreExiste ? { nombreTomado: true } : null;
      }),
      catchError(() => of(null))
    );
  };
}