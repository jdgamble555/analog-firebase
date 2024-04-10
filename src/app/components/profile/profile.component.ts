import { Component, inject } from '@angular/core';
import { LOGOUT, USER } from '@services/user.service';
import { TodosComponent } from '../todos/todos.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TodosComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user = inject(USER);
  logout = inject(LOGOUT);
}
