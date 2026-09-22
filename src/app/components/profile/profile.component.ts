import { Component, inject } from '@angular/core';
import { USER } from '@services/auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user = inject(USER);
}
