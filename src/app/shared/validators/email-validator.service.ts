import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { subscribe } from 'node:diagnostics_channel';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  //validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //  const email = control.value;
  //  console.log({ email });
  //  return of({ emailTaken: true }).pipe(delay(2000));
  //}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>(
      (sus) => {
        console.log(email);
        if (email === 'carlos@mail.com') {
          //Aqui emito este estado
          sus.next({ emailTaken: true });
          //Y termino el observable
          sus.complete();
        }
        sus.next(null);
        sus.complete();
      }
    ).pipe(delay(3000));

    return httpCallObservable;
  }
}
