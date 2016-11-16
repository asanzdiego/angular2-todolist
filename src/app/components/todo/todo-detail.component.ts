import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDo } from '../../entities/todo.entity';
import { ToDoService } from '../../services/todo.service';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  providers: [ToDoService]
})
export class ToDoDetailComponent implements OnInit {

  toDo : ToDo;

  constructor(private _route: ActivatedRoute, private _toDoService: ToDoService) { }

  ngOnInit() {
    let id = +this._route.snapshot.params['id'];
    this._toDoService.get(id, toDo => this.toDo = toDo);
  }

}
