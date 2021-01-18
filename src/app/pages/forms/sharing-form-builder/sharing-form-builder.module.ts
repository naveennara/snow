import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ElementsComponent } from './elements/elements.component';
import { SaveFormComponent  } from './save-form/save-form.component';
import { AngularSplitModule } from 'angular-split';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { PropertiesComponent } from './properties/properties.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharingModuleModule } from '../../../sharing/sharing-module/sharing-module.module';

@NgModule({
  declarations: [FormBuilderComponent,ElementsComponent,SaveFormComponent,PropertiesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule.forRoot(),
    DragDropModule,
    NgMultiSelectDropDownModule.forRoot(),
    DynamicFormModule,
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharingModuleModule,
  ],
  exports:[SaveFormComponent,ElementsComponent]
})
export class SharingFormBuilderModule { }
