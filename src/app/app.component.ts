import { Component } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [
    CoreModule,
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'talmatic-test-task';
}
