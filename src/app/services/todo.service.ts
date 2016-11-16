import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class TodoService {

  constructor(private _restService: RestService) { }

  getAll(page: number, size: number, callback: (todos: ToDo[]) => any) {
    console.log("getAll -> page", page);
    console.log("getAll -> size", size);
    let url = "todo?1=1"
    if (page) {
      url += "&page=" + page;
    }
    if (size) {
      url += "&size=" + size;
    }
    this._restService.callGet(url, json => callback((ToDo[]) json));
  }
  
  get(id: number, callback: (todo: ToDo) => any) {
    console.log("get -> id", id);
    let url = "todo/" + id;
    this._restService.callGet(url, json => callback((ToDo) json));
  }

  save(todo: ToDo, callback: (todo: ToDo) => any) {
    console.log("save -> todo", todo);
    let url = "todo"";
    this._restService.callPost(url, todo, json => callback((ToDo) json));
  }

  update(id: number, todo: ToDo, callback: (todo: ToDo) => any) {
    console.log("update -> id", id);
    console.log("update -> todo", todo);
    let url = "todo/" + id;
    this._restService.callPut(url, todo, json => callback((ToDo) json));
  }

  delete(id: number, callback: (json: any) => any) {
    console.log("delete -> id", id);
    let url = "todo/" + id;
    this._restService.callDelete(url, callback);
  }

}
