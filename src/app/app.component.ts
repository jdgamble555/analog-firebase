import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <router-outlet />
  <nav class="flex gap-3 justify-center mt-5">
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
  </nav>
  `
})
export class AppComponent { }
