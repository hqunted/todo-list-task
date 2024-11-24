import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <app-search-bar
        [todos]="todos"
        (filteredTodos)="updateFilteredTodos($event)"
      ></app-search-bar>
      <app-progress-bar *ngIf="isLoading"></app-progress-bar>
      <app-todo-item
        *ngFor="let todo of filteredTodos"
        [item]="todo"
      ></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  isLoading = true;

  constructor(private todoService: TodoService) {
    this.todoService.getTodos().subscribe(
      (todos) => {
        this.todos = todos;
        this.filteredTodos = todos;
        this.isLoading = false;
        console.log("Todos fetched:", todos);
      },
      (error) => {
        console.error("Error fetching todos:", error);
        this.isLoading = false;
      }
    );
  }

  updateFilteredTodos(filtered: Todo[]) {
    this.filteredTodos = filtered;
  }
}
