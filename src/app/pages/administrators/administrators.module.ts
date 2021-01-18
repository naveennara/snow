import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorsComponent } from './administrators.component';
import { AdministratorCreateComponent } from './administrator-create/administrator-create.component';
import { AdministratorEditComponent } from './administrator-edit/administrator-edit.component';
import { AdministratorDeleteComponent } from './administrator-delete/administrator-delete.component';
import { AdministratorListComponent } from './administrator-list/administrator-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorServiceService } from './administrator-service.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { AdministratorsRoutingModule } from './administrators-routing.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AdministratorsComponent,
    AdministratorCreateComponent,
    AdministratorEditComponent,
    AdministratorDeleteComponent,
    AdministratorListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    TabsModule.forRoot(),
    SharingModuleModule,
    PageHeaderModule,
    NgSelectModule,
    AdministratorsRoutingModule,
    TooltipModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [AdministratorServiceService]
})
export class AdministratorsModule { }
