import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
//import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ResizableModule} from 'angular-resizable-element';
import { FormCreateModalComponent } from './form-create-modal/form-create-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { WindowRef } from '../../sharing/sharing-module/WindowRef';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { NgxPaginationModule} from 'ngx-pagination';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormEditModalComponent } from './form-edit-modal/form-edit-modal.component';
import { SharedRecordsModule } from '../../sharing/shared-records/shared-records.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AvatarModule } from 'ngx-avatar';
import { NgxUploaderModule } from 'ngx-uploader';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import { FormImportAsTemplateComponent } from './form-import-as-template/form-import-as-template.component';
import { VersionHistoryComponent } from './version-history/version-history.component';
import { FormsRoutingModule } from './forms-routing.module';
import { SharingFormBuilderModule } from './sharing-form-builder/sharing-form-builder.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [FormsComponent,
    //FormBuilderComponent,
    FormsListComponent,
    FormCreateModalComponent,
    FormEditModalComponent,
    FormDeleteComponent,
    FormImportAsTemplateComponent,
    VersionHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    SharingModuleModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    NgSelectModule,
    SharedRecordsModule,
    AvatarModule,
    NgxUploaderModule,
    DynamicFormModule,
    SharingFormBuilderModule,
    FormsRoutingModule,
    BsDatepickerModule.forRoot(),

  ],
  providers: [ WindowRef ],
  exports: [ FormCreateModalComponent]
})
export class FormszModule { }
