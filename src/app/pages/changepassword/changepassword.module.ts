import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChangepasswordComponent } from './changepassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
// import { AppPasswordDirective } from '../../togglepassword.directive';

@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharingModuleModule
  ],
  exports: [ ChangepasswordComponent ]
})
export class ChangepasswordModule { }
