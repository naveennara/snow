import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalsListComponent } from './approvals-list/approvals-list.component';
import { ApprovalsComponent } from './approvals.component';
import { ApprovalsWorkAssignmentsComponent } from './approvals-work-assignments/approvals-work-assignments.component';
import { GetRecordsComponent } from '../../sharing/shared-records/get-records/get-records.component';

const routes: Routes = [
  {
    path :'',component:ApprovalsComponent,
    children:[
      { path:'', component:ApprovalsListComponent },
      { path: 'workAssignmentList/:taskId', component: ApprovalsWorkAssignmentsComponent },
      { path: 'getRecords/:taskId/:taskName/:taskStatus', component: GetRecordsComponent }

    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
