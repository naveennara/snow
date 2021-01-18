import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxPaginationModule} from 'ngx-pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { TemplatesCreateComponent } from './templates-create/templates-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesEditComponent } from './templates-edit/templates-edit.component';
import { TemplatesDeleteComponent } from './templates-delete/templates-delete.component';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { TemplatesImportComponent } from './templates-import/templates-import.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DynamicFormModule } from '../forms/dynamic-form/dynamic-form.module';
import { TemplatesRoutingModule } from './templates-routing.module';
import { SharingFormBuilderModule } from '../forms/sharing-form-builder/sharing-form-builder.module';
@NgModule({
  declarations: [
    TemplatesComponent,
    TemplatesListComponent,
    TemplatesCreateComponent,
    TemplatesEditComponent,
    TemplatesDeleteComponent,
    TemplatesImportComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AvatarModule,
    AccordionModule.forRoot(),
    PageHeaderModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharingModuleModule,
    NgxSmartModalModule.forRoot(),
    DynamicFormModule,
    SharingFormBuilderModule,
    //FormszModule,
    TemplatesRoutingModule
  ]
})
export class TemplatesModule { }
