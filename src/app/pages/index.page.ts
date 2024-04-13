import { Component } from '@angular/core';
import { HomeComponent } from '@components/home/home.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HomeComponent],
  template: ` <app-home /> `
})
export default class IndexComponent { }
