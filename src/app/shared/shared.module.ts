import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppHeaderComponent} from './app-header/app-header.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorMessagesComponent } from './forms/error-messages/error-messages.component';
import { WithErrorMessagesComponent } from './forms/with-error-messages/with-error-messages.component';

@NgModule({
  declarations: [AppHeaderComponent, SpinnerComponent, ErrorMessagesComponent, WithErrorMessagesComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [CommonModule, RouterModule, AppHeaderComponent, ReactiveFormsModule, WithErrorMessagesComponent, ErrorMessagesComponent]
})
export class SharedModule { }
