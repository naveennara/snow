import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersBulkimportComponent } from './users-bulkimport/users-bulkimport.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { AvatarModule } from 'ngx-avatar';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    UsersCreateComponent,
    UsersDeleteComponent,
    UsersEditComponent,
    UsersBulkimportComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule,
    PageHeaderModule,
    NgSelectModule,
    SharingModuleModule,
    AvatarModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
