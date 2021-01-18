import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLinkRoutingModule } from './form-link-routing.module';
import { FormSuccessComponent } from './form-success.component';
import { FormExpiredComponent } from './form-expired/form-expired.component';


@NgModule({
  declarations: [FormSuccessComponent, FormExpiredComponent],
  imports: [
    CommonModule,
    FormLinkRoutingModule
  ]
})
export class FormLinkModule { }
