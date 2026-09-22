import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { deleteTodo, updateTodo } from '@lib/todos';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {

  @Input() todo!: TodoDoc;

  error = signal<string | null>(null);

  async toggleStatus() {
    this.error.set((await updateTodo(this.todo.id, !this.todo.complete)).error);
  }

  async remove() {
    this.error.set((await deleteTodo(this.todo.id)).error);
  }

}
