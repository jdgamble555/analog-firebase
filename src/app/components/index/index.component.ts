import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { LOGIN, USER } from '@services/user.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './index.component.html'
})
export class IndexComponent {
  user = inject(USER);
  login = inject(LOGIN);
}
