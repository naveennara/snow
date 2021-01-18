import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { BlankComponent } from '../blank/blank.component';
import { TasksComponent } from '../tasks/tasks.component'; 
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';
import { TaskEditComponent } from '../tasks/task-edit/task-edit.component';
import { WorkAssignmentCreateComponent } from '../work-assignments/work-assignment-create/work-assignment-create.component';
import { WorkAssignmentEditComponent } from '../work-assignments/work-assignment-edit/work-assignment-edit.component';
import { WorkAssignmentListComponent } from '../work-assignments/work-assignment-list/work-assignment-list.component';
import { GetRecordsComponent } from '../../sharing/shared-records/get-records/get-records.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';
const routes: Routes = [
  {
    path: '', component: BlankComponent,
    children: [
      {
        path: 'projects', component: ProjectsComponent,
        children: [
          { path: '', component: ProjectsListComponent },
          { path: 'create', component: ProjectsCreateComponent,canDeactivate:[DeactivateGuardService] },
          { path: 'edit/:projectId', component: ProjectsEditComponent,canDeactivate:[DeactivateGuardService] },
        ]
      },
      { path: 'projectTasks/:projectId', component: TasksComponent,
        children: [
          { path: '', component: TaskListComponent },
          { path: 'create/:projectId', component: TaskCreateComponent ,canDeactivate:[DeactivateGuardService]},
          { path: 'edit/:taskId', component: TaskEditComponent,canDeactivate:[DeactivateGuardService] },

          { path: 'workAssignmentList/:taskId', component: WorkAssignmentListComponent },
          { path: 'createWorkAssignment/:taskId', component: WorkAssignmentCreateComponent,canDeactivate:[DeactivateGuardService] },
          { path: 'editWorkAssignment/:taskId', component: WorkAssignmentEditComponent,canDeactivate:[DeactivateGuardService] },
          { path: 'getRecords/:taskId/:taskName/:taskStatus', component: GetRecordsComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
