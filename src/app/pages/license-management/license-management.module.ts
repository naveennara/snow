import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { NgxPaginationModule} from 'ngx-pagination';
import { LicenseManagementListComponent } from './license-management-list/license-management-list.component';
import { LicenseManagementComponent } from './license-management.component';
import { LicenseManagementRoutingModule } from './license-management-routing.module';
import { LicenseManagementCreateComponent } from './license-management-create/license-management-create.component';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { LicenseManagementRenewComponent } from './license-management-renew/license-management-renew.component';

@NgModule({
  declarations: [LicenseManagementListComponent, LicenseManagementComponent, LicenseManagementCreateComponent, LicenseManagementRenewComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgxPaginationModule,
    LicenseManagementRoutingModule,
    SharingModuleModule
  ]
})
export class LicenseManagementModule { }
