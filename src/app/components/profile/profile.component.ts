import { Component, inject } from '@angular/core';
import { USER } from '@lib/auth';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user = inject(USER);
}
