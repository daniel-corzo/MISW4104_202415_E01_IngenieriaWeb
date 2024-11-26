import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  const today = new Date();
  const inputDate = new Date(control.value);

  if (inputDate > today) {
    return { futureDate: true };
  }
  return null;
}
