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
      <label for="search">Search...</label>
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

  readonly todos$: Observable<Todo[]>;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  isLoading = true;

  constructor(private todoService: TodoService) {
    this.todos$ = todoService.getAll();
    this.todos$.subscribe((todos) => {
      this.isLoading = false;
      this.todos = todos;
      this.filteredTodos = todos;
    });
  }

  updateFilteredTodos(filtered: Todo[]) {
    this.filteredTodos = filtered;
  }
}
