import { Component, inject } from '@angular/core';
import { TodosService } from '@services/todos.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [],
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  ts = inject(TodosService);
  user = inject(UserService).user$;
}
