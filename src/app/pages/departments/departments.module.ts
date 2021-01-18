import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDeleteComponent } from './department-delete/department-delete.component';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsService } from './departments.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { RemoveAdminsUsersComponent } from './remove-admins-users/remove-admins-users.component';
import { DepartmentsRoutingModule } from './departments-routing.module';

@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    DepartmentListComponent,
    DepartmentDeleteComponent,
    RemoveAdminsUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharingModuleModule,
    PageHeaderModule,
    DepartmentsRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],

  providers: [DepartmentsService]
 
})
export class DepartmentsModule { }
