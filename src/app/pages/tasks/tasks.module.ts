import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { AngularSplitModule } from 'angular-split';
import { SidebarModule } from 'ng-sidebar';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { WorkflowhistoryComponent } from './workflowhistory/workflowhistory.component';
import { WorkAssignmentsModule } from '../work-assignments/work-assignments.module';
import { SharedRecordsModule } from '../../sharing/shared-records/shared-records.module';

@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskEditComponent,
    TaskDeleteComponent,
    WorkflowhistoryComponent,
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
    NgxPaginationModule,
    NgxSmartModalModule,
    TasksRoutingModule,
    WorkAssignmentsModule,
    SharedRecordsModule
    // workflowCycleModule
    // QuickSidebarModule
  ],
  exports : [TaskListComponent,WorkflowhistoryComponent]
})
export class TasksModule { }
