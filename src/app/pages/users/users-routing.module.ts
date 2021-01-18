import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersBulkimportComponent } from './users-bulkimport/users-bulkimport.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';
const routes: Routes = [
  {
    path: '',  component: UsersComponent,
      children: [
        { path: '', component: UsersListComponent },
        { path: 'create', component: UsersCreateComponent,canDeactivate:[DeactivateGuardService] },
        { path: 'bulkimport', component: UsersBulkimportComponent ,canDeactivate:[DeactivateGuardService]},
        { path: 'edit/:userId', component: UsersEditComponent,canDeactivate:[DeactivateGuardService] }
      ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
