import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceManagementComponent } from './device-management.component';
import { DeviceManagementListComponent } from './device-management-list/device-management-list.component';
const routes: Routes = [
  {
    path: '', component: DeviceManagementComponent,
    children: [
      { path: '', component: DeviceManagementListComponent },
     
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceManagementRoutingModule { }
