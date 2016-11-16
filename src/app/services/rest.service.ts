import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { GlobalError } from '../util/global-error';
import { AlertService } from './alert.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {

  private _restURL = environment.restURL;

  constructor(private _http: Http, private _alertService: AlertService) { }

  private _getRequestOptions() {
    let headers = new Headers({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    return new RequestOptions({ headers });
  }

  callGet(url: string, callback: (json: any) => any) {
    console.log("callGet -> url", url);
    this._http.get(this._restURL + url, this._getRequestOptions())
      .toPromise()
      .then(this._processResponse)
      .catch(this._handleError(this._alertService))
      .then(json => callback(json));
  }

  callPost(url: string, body: any, callback: (json: any) => any) {
    console.log("callPost -> url", url);
    console.log("callPost -> body", body);
    this._http.post(this._restURL + url, JSON.stringify(body), this._getRequestOptions())
      .toPromise()
      .then(this._processResponse)
      .catch(this._handleError(this._alertService))
      .then(json => callback(json));
  }

  callPut(url: string, body: any, callback: (json: any) => any) {
    console.log("callPut -> url", url);
    console.log("callPut -> body", body);
    this._http.put(this._restURL + url, JSON.stringify(body), this._getRequestOptions())
      .toPromise()
      .then(this._processResponse)
      .catch(this._handleError(this._alertService))
      .then(json => callback(json));
  }

  callDelete(url: string, callback: (json: any) => any) {
    console.log("callDelete -> url", url);
    this._http.delete(this._restURL + url, this._getRequestOptions())
      .toPromise()
      .then(this._processResponse)
      .catch(this._handleError(this._alertService))
      .then(json => callback(json));
  }

  private _processResponse(response: Response) {
    if (response.status === 200) {
      if (response.text() != "") {
        console.log("_processResponse", response.json());
        return response.json();
      } else {
        return {};
      }
    } else {
      let globalError = new GlobalError(response.json());
      this._alertService.onError(globalError);
    }
  }

  private _handleError(alertService: AlertService) {
    return function(response: Response) {
      console.log('_handleError: ', response);
      let globalError: GlobalError;
      if (response.status === 404) {

        globalError = new GlobalError({
          status: response.status,
          error: 'No encontrado',
          message: 'Recurso no encontrado.'
        });
        alertService.onError(globalError);

      } else if (response.status === 400) {

        globalError = new GlobalError({
          status: response.status,
          error: 'Petición incorrecta',
          message: response.text() || 'Los datos de la petición no son correctos.'
        });
        alertService.onError(globalError);

      } else {

        globalError = new GlobalError({
          status: response.status,
          error: 'Desconocido',
          message: 'Ha ocurrido un error desconocido.'
        });
        alertService.onError(globalError);
      }
      return Observable.throw(globalError);
    }
  }

}
