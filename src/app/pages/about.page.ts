import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import AboutComponent from '@components/about/about.component';
import { aboutResolver } from '@components/about/about.resolver';

export const routeMeta: RouteMeta = {
  resolve: { data: aboutResolver }
};

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [AboutComponent],
  template: ` <app-about /> `
})
export default class AboutRoute { }