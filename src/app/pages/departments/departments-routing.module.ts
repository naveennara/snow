import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { RemoveAdminsUsersComponent } from './remove-admins-users/remove-admins-users.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';

const routes: Routes = [
  {
    path: '', component: DepartmentsComponent,
    children: [
      { path: '', component: DepartmentListComponent },
      { path: 'create', component: DepartmentCreateComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'edit/:accountId', component: DepartmentEditComponent ,canDeactivate:[DeactivateGuardService]},
      { path: 'removeAdmins/:accountId', component: RemoveAdminsUsersComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
