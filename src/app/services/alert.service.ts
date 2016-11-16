import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GlobalError } from '../util/global.error';

@Injectable()
export class AlertaService {

  private _onError = new Subject<GlobalError>();

  onError$ = this._onError.asObservable();

  onError(globalError: GlobalError) {
    this._onError.next(globalError);
  }

}