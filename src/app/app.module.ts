import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { ToDoComponent } from './components/todo/todo.component';
import { ToDoDetailComponent } from './components/todo/todo-detail.component';
import { ToDoListComponent } from './components/todo/todo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    ToDoDetailComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'todo/:id',
        component: ToDoDetailComponent
      },
      {
        path: '**',
        component: ToDoComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
