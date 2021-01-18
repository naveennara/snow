import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowManagementComponent } from './workflow-management.component';
import { WorkFlowListComponent } from './work-flow-list/work-flow-list.component';
import { WorkFlowCreateComponent } from './work-flow-create/work-flow-create.component';
import { WorkFlowEditComponent } from './work-flow-edit/work-flow-edit.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';
const routes: Routes = [
  {
    path: '', component: WorkflowManagementComponent,
    children: [
      { path: '', component: WorkFlowListComponent },
      { path: 'create', component: WorkFlowCreateComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'edit/:workFlowId', component: WorkFlowEditComponent,canDeactivate:[DeactivateGuardService] }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowManagementRoutingModule { }
