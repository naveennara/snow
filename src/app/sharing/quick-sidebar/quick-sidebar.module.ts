import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickSidebarComponent } from './quick-sidebar.component';
import { TasksModule } from '../../pages/tasks/tasks.module';
import { WorkAssignmentsModule } from '../../pages/work-assignments/work-assignments.module';
import { Routes, RouterModule } from '@angular/router';
import { workflowCycleModule } from '../../pages/tasks/workflow-cycle/workflow-cycle.module';
import { DynamicFormModule } from '../../pages/forms/dynamic-form/dynamic-form.module';
import { SharedRecordsModule } from '../../sharing/shared-records/shared-records.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DashboardsModule } from '../dashboards/dashboards.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppSettingsModule } from '../../pages/app-settings/app-settings.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuickSidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TasksModule,
    WorkAssignmentsModule,
    workflowCycleModule,
    DynamicFormModule,
    SharedRecordsModule,
    DashboardsModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    AppSettingsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  // providers: [WorkAssignmentListComponent],
  exports: [
    QuickSidebarComponent
  ]
})
export class QuickSidebarModule { }
