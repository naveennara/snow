import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalsListComponent } from './approvals-list/approvals-list.component';
import { ApprovalsComponent } from './approvals.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalsWorkAssignmentsComponent } from './approvals-work-assignments/approvals-work-assignments.component';
import { ApprovalsRoutingModule } from './approvals-routing.module';
import { SharedRecordsModule } from '../../sharing/shared-records/shared-records.module'; 

@NgModule({
  declarations: [ApprovalsListComponent, ApprovalsComponent,  ApprovalsWorkAssignmentsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    SharingModuleModule,
    PageHeaderModule,
    ApprovalsRoutingModule,
    SharedRecordsModule
  ]
})
export class ApprovalsModule { }
