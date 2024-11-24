import { Component, Input } from "@angular/core";
import { Todo } from "../todo.service";
import { ChangeDetectorRef } from "@angular/core";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="task-indicator">
      {{ item.task }}
    </div>
    <div class="priority-indicator" [style.background-color]="color">
      {{ item.priority }}
    </div>
    <button (click)="remove(item.id)">x</button>
  `,
  styleUrls: ['todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() item!: Todo;

  get color() {
    switch (this.item.priority) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
    }
  }

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {}
  remove(id: number) {
    this.todoService.remove(id).subscribe({
      next: () => {},
      error: (err) => {
        console.error(err);
      },
    });
  }
}
