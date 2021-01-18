import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseManagementComponent } from './license-management.component';
import { LicenseManagementListComponent } from './license-management-list/license-management-list.component';
import { LicenseManagementCreateComponent } from './license-management-create/license-management-create.component';
import { LicenseManagementRenewComponent } from './license-management-renew/license-management-renew.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';
const routes: Routes = [
  {
    path: '', component: LicenseManagementComponent,
    children: [
      { path: '', component: LicenseManagementListComponent },
      {
        path:'create',component:LicenseManagementCreateComponent,canDeactivate:[DeactivateGuardService]
      },
      {
        path:'renew',component:LicenseManagementRenewComponent,canDeactivate:[DeactivateGuardService]
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseManagementRoutingModule { }
