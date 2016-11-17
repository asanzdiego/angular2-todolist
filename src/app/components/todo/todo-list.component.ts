import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { ToDo } from '../../entities/todo.entity';
import { ToDoService } from '../../services/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [ToDoService]
})
export class ToDoListComponent implements OnInit {

  toDos: ToDo[] = [];

  constructor(private _toDoService: ToDoService, private _router: Router) { }

  ngOnInit() {
    this._toDoService.getAll(0, 200, "").then(toDos => this.toDos = toDos);
  }

  open(toDo: ToDo) {
    this._router.navigate(['/todo', toDo.id]);
  }
}
