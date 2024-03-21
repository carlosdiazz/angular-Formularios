import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  cantBeStrider,
  emailPattern,
  firstNameAndLastnamePattern,
} from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}
  public myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.firstNameAndLastnamePattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
      [new EmailValidatorService()],
    ],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  public isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  public onSaved() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
