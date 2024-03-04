import { Component } from '@angular/core';
import { IndexComponent } from '../components/index/index.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IndexComponent],
  template: ` <app-index /> `
})
export default class HomeComponent { }
