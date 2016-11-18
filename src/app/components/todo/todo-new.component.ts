import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { ToDo } from '../../entities/todo.entity';
import { ToDoService } from '../../services/todo.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'todo',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.css'],
  providers: [ToDoService]
})
export class ToDoNewComponent implements OnInit {

  toDo: ToDo;

  constructor(
    private _router: Router, 
    private _toDoService: ToDoService, 
    private _alertService: AlertService) { }

  ngOnInit() {
    this.toDo = new ToDo();
  }

  save() {
    this._toDoService.save(this.toDo)
      .then(toDo => this._alertService.onToDoNew(toDo));
  }
}
