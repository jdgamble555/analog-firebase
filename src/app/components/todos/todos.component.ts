import { Component, inject } from '@angular/core';
import { TodosService } from '@services/todos.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

// https://github.com/angular/angular/issues/18877

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoItemComponent, TodoFormComponent],
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  todos = inject(TodosService).todos;
}
