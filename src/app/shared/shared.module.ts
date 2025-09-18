import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbLayoutModule,
  NbListModule,
  NbSelectModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusPipe } from './pipes/status.pipe';
import { StateLabelPipe } from './pipes/state-label.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbBadgeModule,
    NbSelectModule,

    StatusPipe,
    StateLabelPipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbBadgeModule,
    NbSelectModule,

    StatusPipe,
    StateLabelPipe
  ]
})
export class SharedModule { }
