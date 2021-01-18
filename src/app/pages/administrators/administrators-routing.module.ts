import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorsComponent } from './administrators.component';
import { AdministratorListComponent } from './administrator-list/administrator-list.component';
import { AdministratorCreateComponent } from './administrator-create/administrator-create.component';
import { AdministratorEditComponent } from './administrator-edit/administrator-edit.component';
import { AuthGuard } from '../../auth-guard.service';
import { DeactivateGuardService } from '../../deactivate-guard.service';

const routes: Routes = [
  {
    path: '', component: AdministratorsComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdministratorListComponent },
      { path: 'create', component: AdministratorCreateComponent ,canDeactivate:[DeactivateGuardService]},
      { path: 'edit/:adminId', component: AdministratorEditComponent ,canDeactivate:[DeactivateGuardService]}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorsRoutingModule { }
