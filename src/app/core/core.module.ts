import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NbButtonModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';

const NbModules = [
  NbLayoutModule,
  NbButtonModule
]

const coreModules = [
  RouterModule,
]

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    ...NbModules,
    ...coreModules
  ],
  exports: [
    NavBarComponent,
    RouterModule,
    ...NbModules,
    ...coreModules
  ],
})
export class CoreModule { }
