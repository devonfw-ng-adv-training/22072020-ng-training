import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'ba-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {
  @HostBinding('class')
  invalidFeedback = 'invalid-feedback';

  errors$: Observable<string[]> | undefined;

  // tslint:disable-next-line:no-input-rename
  @Input('of')
  set control(newControl: AbstractControl) {
    if (newControl) {
      this.errors$ = newControl.statusChanges
        .pipe(
          startWith(newControl.status),
          filter(status => status === 'INVALID' || status === 'VALID'),
          map(status => status === 'INVALID' ? getErrorMessagesFor(newControl) : [])
        );
    }
  }

  constructor() {
  }
}


function getErrorMessagesFor(control: AbstractControl): string[] {
  const errors = control?.errors;
  if (errors) {
    return Object.keys(errors)
      .map(errorCode => {
        let errorMessage;
        switch (errorCode) {
          case 'ourOwnRequired':
          case 'required':
            errorMessage = 'Please provide a value';
            break;
          case 'onlyNamesOf':
            const errorMetadataOfOnlyNamesOf = errors[errorCode] as string[];
            errorMessage = `Only specific names can be put: ${errorMetadataOfOnlyNamesOf.join(', ')}`;
            break;
          case 'maxlength':
            const errorMetadata = errors[errorCode];
            errorMessage = `The value provided is too long
              (max. ${errorMetadata.requiredLength} characters)`;
            break;
          default:
            errorMessage = 'Unknown error';
            break;
        }
        return errorMessage;
      });
  }
  return [];
}
