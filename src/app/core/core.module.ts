import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NbButtonModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [NavBarComponent],
  imports: [NbButtonModule, RouterModule],
  exports: [
    NavBarComponent
  ],
})
export class CoreModule { }
