import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoryListViewComponent } from './category-list-view/category-list-view.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { NgxPaginationModule} from 'ngx-pagination';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryListViewComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharingModuleModule,
    ReactiveFormsModule,
    PageHeaderModule,
    NgxPaginationModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
