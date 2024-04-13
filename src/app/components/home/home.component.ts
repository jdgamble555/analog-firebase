import { Component, inject } from '@angular/core';
import { ProfileComponent } from '@components/profile/profile.component';
import { LOGIN, USER } from '@services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user = inject(USER);
  login = inject(LOGIN);
}
