import {AfterContentInit, Component, ContentChild} from '@angular/core';
import {AbstractControl, FormControlName} from '@angular/forms';

@Component({
  selector: 'ba-with-error-messages',
  templateUrl: './with-error-messages.component.html',
  styleUrls: ['./with-error-messages.component.scss']
})
export class WithErrorMessagesComponent implements AfterContentInit{
  @ContentChild(FormControlName)
  formControlName: FormControlName | undefined;

  control: AbstractControl | undefined;

  constructor() { }

  ngAfterContentInit(): void {
    if (this.formControlName) {
      this.control = this.formControlName.control;
    } else {
      console.warn('No form control found');
    }
  }
}
