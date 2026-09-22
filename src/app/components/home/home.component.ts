import { Component, inject, signal } from '@angular/core';
import { ProfileComponent } from '@components/profile/profile.component';
import { TodosComponent } from '@components/todos/todos.component';
import { USER, login, logout } from '@lib/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent, TodosComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user = inject(USER);
  actionError = signal<string | null>(null);

  async signIn() {
    const result = await login();
    this.actionError.set(result.error);
  }

  async signOut() {
    const result = await logout();
    this.actionError.set(result.error);
  }
}
