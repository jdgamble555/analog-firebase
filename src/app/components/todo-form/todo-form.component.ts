import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { USER } from '@lib/auth';
import { addTodo, generateText } from '@lib/todos';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  private user = inject(USER);
  text = generateText();
  error = signal<string | null>(null);

  async add() {
    const result = await addTodo(this.text.trim(), this.user().data);
    this.error.set(result.error);
    if (!result.error) {
      this.text = generateText();
    }
  }
}
