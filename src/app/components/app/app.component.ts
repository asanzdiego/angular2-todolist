import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AlertService,
    RestService
  ]
})
export class AppComponent {

  globalError = null;

  constructor(private _alertService: AlertService) {

    this._alertService.onError$.subscribe(
      globalError => this.globalError = globalError);
  }

  closeGlobalError() {
    this.globalError = null;
  }
}
