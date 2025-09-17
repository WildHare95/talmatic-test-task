import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NbButtonModule, NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { CoreModule } from './core/core.module';

@Component({
  selector: 'app-root',
  imports: [
    CoreModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'talmatic-test-task';
}
