import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GlobalError } from '../util/global-error';
import { ToDo } from '../entities/todo.entity';

@Injectable()
export class AlertService {

  private _onError = new Subject<GlobalError>();
  private _onToDoDeleted = new Subject<ToDo>();
  private _onToDoUpdated = new Subject<ToDo>();
  private _onToDoNew = new Subject<ToDo>();

  onError$ = this._onError.asObservable();
  onToDoDeleted$ = this._onToDoDeleted.asObservable();
  onToDoUpdated$ = this._onToDoUpdated.asObservable();
  onToDoNew$ = this._onToDoNew.asObservable();

  onError(globalError: GlobalError) {
    console.log("onError");
    this._onError.next(globalError);
  }

  onToDoDeleted(toDo: ToDo) {
    console.log("onToDoDeleted");
    this._onToDoDeleted.next(toDo);
  }

  onToDoUpdated(toDo: ToDo) {
    console.log("onToDoUpdated");
    this._onToDoUpdated.next(toDo);
  }

  onToDoNew(toDo: ToDo) {
    console.log("onToDoNew");
    this._onToDoNew.next(toDo);
  }
}