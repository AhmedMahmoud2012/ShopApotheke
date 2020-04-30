import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = "Shope Apotheke";
  constructor(public appService: AppService) {

  }
}
