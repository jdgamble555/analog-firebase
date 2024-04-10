import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DELETE_TODO, TodoItem, UPDATE_TODO } from '@services/todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {

  @Input() todo!: TodoItem;

  updateTodo = inject(UPDATE_TODO);
  deleteTodo = inject(DELETE_TODO);

}
