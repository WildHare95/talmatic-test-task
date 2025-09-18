import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NbThemeModule, NbWindowModule } from '@nebular/theme';
import { StorageStore } from './core/services/storage.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      NbWindowModule.forRoot({})
    ),
    StorageStore
  ]
};
