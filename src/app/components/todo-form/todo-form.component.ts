import { Component, inject } from '@angular/core';
import { ADD_TODO } from '@services/todos.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [],
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  addTodo = inject(ADD_TODO);
}
