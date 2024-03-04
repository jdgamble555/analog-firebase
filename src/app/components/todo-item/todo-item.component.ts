import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { TodoItem, TodosService } from '@services/todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {

  @Input() todo!: TodoItem;

  ts = inject(TodosService);

}
