import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowManagementComponent } from './workflow-management.component';
import { WorkFlowListComponent } from './work-flow-list/work-flow-list.component';
import { WorkFlowCreateComponent } from './work-flow-create/work-flow-create.component';
import { WorkFlowEditComponent } from './work-flow-edit/work-flow-edit.component';
import { WorkFlowLevelComponent } from './work-flow-level/work-flow-level.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkflowDeleteComponent } from './workflow-delete/workflow-delete.component';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { WorkflowManagementRoutingModule } from './workflow-management-routing.module';

@NgModule({
  declarations: [
    WorkflowManagementComponent,
    WorkFlowListComponent,
    WorkFlowCreateComponent,
    WorkFlowEditComponent,
    WorkFlowLevelComponent,
    WorkflowDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PageHeaderModule,
    SharingModuleModule,
    NgxPaginationModule,
    WorkflowManagementRoutingModule
  ]
})
export class WorkflowManagementModule { }
