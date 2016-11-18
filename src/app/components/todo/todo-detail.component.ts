import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToDo } from '../../entities/todo.entity';
import { ToDoService } from '../../services/todo.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  providers: [ToDoService]
})
export class ToDoDetailComponent implements OnInit {

  toDo: ToDo;

  constructor(
    private _router: Router, 
    private _route: ActivatedRoute,
    private _toDoService: ToDoService, 
    private _alertService: AlertService) { }

  ngOnInit() {
    this._route.params
      .switchMap((params: Params) => this._toDoService.get(+params['id']))
      .subscribe(toDo => this.toDo = toDo);
  }

  delete() {
    this._toDoService.delete(this.toDo.id)
      .then(toDo => this._alertService.onToDoDeleted(toDo));
  }

  update() {
    this._toDoService.update(this.toDo)
      .then(toDo => this._alertService.onToDoUpdated(toDo));
  }

}
