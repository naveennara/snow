import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoryListViewComponent } from './category-list-view/category-list-view.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';

const routes: Routes = [
  {
    path: '', component: CategoriesComponent,
        children: [
          { path: '', component: CategoryListViewComponent },
          { path: 'create', component: CategoryCreateComponent,canDeactivate:[DeactivateGuardService] },
          { path: 'edit/:categoryId', component: CategoryEditComponent,canDeactivate:[DeactivateGuardService] }
        ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
