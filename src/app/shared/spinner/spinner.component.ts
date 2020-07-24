import {Component} from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'ba-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(public readonly spinner: SpinnerService) { }
}
