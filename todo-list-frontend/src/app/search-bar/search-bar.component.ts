import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "../todo.service";

@Component({
  selector: "app-search-bar",
  template: `
    <input
      type="text"
      placeholder="Please enter a search term..."
      (input)="onInput($event)"
    />
  `,
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent {
  @Input() todos: Todo[] = [];
  @Output() filteredTodos = new EventEmitter<Todo[]>();

  onInput(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    const filtered = this.todos.filter((todo) =>
      todo.task.toLowerCase().includes(searchTerm)
    );

    this.filteredTodos.emit(filtered);
  }
}
