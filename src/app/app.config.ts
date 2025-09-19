import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NbThemeModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { StorageStore } from './core/services/storage.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      NbWindowModule.forRoot({}),
      NbToastrModule.forRoot({})
    ),
    StorageStore
  ]
};
