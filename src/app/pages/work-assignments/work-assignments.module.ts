import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkAssignmentsComponent } from './work-assignments.component';
import { WorkAssignmentCreateComponent } from './work-assignment-create/work-assignment-create.component';
import { WorkAssignmentEditComponent } from './work-assignment-edit/work-assignment-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { AngularSplitModule } from 'angular-split';
import { SidebarModule } from 'ng-sidebar';
// import { QuickSidebarModule } from '../../sharing/quick-sidebar/quick-sidebar.module';
import { WorkAssignmentListComponent } from './work-assignment-list/work-assignment-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { WorkAssignmentDeleteComponent } from './work-assignment-delete/work-assignment-delete.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    WorkAssignmentsComponent,
    WorkAssignmentCreateComponent,
    WorkAssignmentEditComponent,
    WorkAssignmentListComponent,
    WorkAssignmentDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    AngularSplitModule.forRoot(),
    SidebarModule.forRoot(),
    SharingModuleModule,
    PageHeaderModule,
    NgSelectModule,
    AgGridModule.withComponents([])
  ],
  exports: [ WorkAssignmentListComponent, WorkAssignmentCreateComponent, WorkAssignmentEditComponent]
})
export class WorkAssignmentsModule { }
