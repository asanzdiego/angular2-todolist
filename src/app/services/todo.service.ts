import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { ToDo } from '../entities/todo.entity';
import { environment } from '../../environments/environment';
import { GlobalError } from '../util/global-error';
import { AlertService } from './alert.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ToDoService {

  private _restURL = environment.restURL;

  constructor(private _http: Http, private _alertService: AlertService) { }

  private _getRequestOptions() {
    let headers = new Headers({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    return new RequestOptions({ headers });
  }

  getAll(page: number, size: number, name): Promise<ToDo[]> {
    let url = "todo?1=1"
    if (page) {
      url += "&page=" + page;
    }
    if (size) {
      url += "&size=" + size;
    }
    if (name) {
      url += "&name=" + name;
    }
    console.log("getAll -> url", url);
    return this._http.get(this._restURL + url, this._getRequestOptions())
      .toPromise()
      .then(response => response.json().content as ToDo[])
      .catch(this._handleError(this._alertService));
  }

  get(id: number): Promise<ToDo> {
    console.log("get -> id", id);
    let url = "todo/" + id;
    return this._http.get(this._restURL + url, this._getRequestOptions())
      .toPromise()
      .then(response => response.json() as ToDo)
      .catch(this._handleError(this._alertService));
  }

  save(toDo: ToDo): Promise<ToDo> {
    console.log("save -> toDo", toDo);
    let url = "todo";
    return this._http.post(this._restURL + url, toDo, this._getRequestOptions())
      .toPromise()
      .then(response => response.json() as ToDo)
      .catch(this._handleError(this._alertService));
  }

  update(toDo: ToDo): Promise<ToDo> {
    console.log("update -> toDo", toDo);
    let url = "todo/" + toDo.id;
    return this._http.put(this._restURL + url, toDo, this._getRequestOptions())
      .toPromise()
      .then(response => response.json() as ToDo)
      .catch(this._handleError(this._alertService));
  }

  delete(id: number): Promise<ToDo> {
    console.log("delete -> id", id);
    let url = "todo/" + id;
    return this._http.delete(this._restURL + url, this._getRequestOptions())
      .toPromise()
      .then(response => response.json() as ToDo)
      .catch(this._handleError(this._alertService));
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
      return Promise.reject(globalError);
    }
  }
}
