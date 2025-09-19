import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NbButtonModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavBarComponent],
  imports: [NbButtonModule, RouterModule],
  exports: [
    NavBarComponent
  ],
})
export class CoreModule { }
