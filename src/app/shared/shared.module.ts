import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    DropdownDirective, 
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    DropdownDirective, 
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  providers: [
    //LoggingService
  ]
})
export class SharedModule { }
