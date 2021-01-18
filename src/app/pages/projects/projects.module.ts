import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects.component';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ProjectsDeleteComponent } from './projects-delete/projects-delete.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { BlankComponent } from '../blank/blank.component';
import { TasksModule } from '../tasks/tasks.module';

@NgModule({
  declarations: [ProjectsComponent, ProjectsCreateComponent, ProjectsEditComponent, ProjectsDeleteComponent, ProjectsListComponent,BlankComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule,
    NgxPaginationModule,
    SharingModuleModule,
    NgSelectModule,
    TasksModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
