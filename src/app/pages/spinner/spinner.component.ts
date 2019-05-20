import { Component, Input } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() set showSpinner(showSpinner: boolean) {
    this.show = showSpinner;
    this.heightOfContent = window.innerHeight > document.body.scrollHeight ? window.innerHeight : document.body.scrollHeight;
  }

  show: boolean;
  heightOfContent: number;

  constructor(public platform: Platform) { }
}
