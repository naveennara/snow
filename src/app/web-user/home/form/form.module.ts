import { SubmitSuccessComponent } from './../../components/submit-success/submit-success.component';
import { FormComponent } from './form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { formroutes } from './form.route';
import { DynamicFormModule } from './../../dynamic-form-web-user/dynamic-form.module';
import { ComponentsModule } from '../../components/components.module';
import { AttachmentComponent } from './attachment/attachment.component';
import { AttachmentProgressComponent } from './attachment-progress/attachment-progress.component';
@NgModule({
  declarations: [FormComponent, SubmitSuccessComponent, AttachmentComponent, AttachmentProgressComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(formroutes),
    DynamicFormModule,
    ComponentsModule
  ],
  entryComponents: [SubmitSuccessComponent]
})
export class FormModule { }
