import 'zone.js/node';
import '@angular/platform-server/init';

import { enableProdMode } from '@angular/core';
import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser';
import { render } from '@analogjs/router/server';

import { config } from './app/app.config.server';
import { AppComponent } from './app/app.component';

if (import.meta.env.PROD) {
  enableProdMode();
}

export function bootstrap(context?: BootstrapContext) {
  return bootstrapApplication(AppComponent, config, context);
}

export default render(AppComponent, config);
