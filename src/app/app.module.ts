import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './components/app/app.component';
import { ToDoNewComponent } from './components/todo/todo-new.component';
import { ToDoDetailComponent } from './components/todo/todo-detail.component';
import { ToDoListComponent } from './components/todo/todo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ToDoNewComponent,
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
        component: ToDoNewComponent
      }
    ]),
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
