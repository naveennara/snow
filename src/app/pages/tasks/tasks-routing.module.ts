import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { WorkAssignmentCreateComponent } from '../work-assignments/work-assignment-create/work-assignment-create.component';
import { WorkAssignmentEditComponent } from '../work-assignments/work-assignment-edit/work-assignment-edit.component';
import { WorkAssignmentListComponent } from '../work-assignments/work-assignment-list/work-assignment-list.component';
import { GetRecordsComponent } from '../../sharing/shared-records/get-records/get-records.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';

const routes: Routes = [
  {
    path: '', component: TasksComponent,
    children: [
      { path: '', component: TaskListComponent },
      { path: 'create', component: TaskCreateComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'edit/:taskId', component: TaskEditComponent ,canDeactivate:[DeactivateGuardService]},

      { path: 'workAssignmentList/:taskId', component: WorkAssignmentListComponent },
      { path: 'createWorkAssignment/:taskId', component: WorkAssignmentCreateComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'editWorkAssignment/:taskId', component: WorkAssignmentEditComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'getRecords/:taskId/:taskName/:taskStatus', component: GetRecordsComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
