import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { TemplatesCreateComponent } from './templates-create/templates-create.component';
import { TemplatesEditComponent } from './templates-edit/templates-edit.component';
import { TemplatesImportComponent } from './templates-import/templates-import.component';
import { FormBuilderComponent } from '../forms/sharing-form-builder/form-builder/form-builder.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';
const routes: Routes = [
  {
    path: '', component: TemplatesComponent,
    children: [
      { path: '', component: TemplatesListComponent },
      { path: 'create', component: TemplatesCreateComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'edit/:templateId', component: TemplatesEditComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'importTemplate/:templateId', component: TemplatesImportComponent },
      { path: 'formbuilder', component: FormBuilderComponent,canDeactivate:[DeactivateGuardService] },
      // { path: 'getRecords/:formId/:formName', component: GetRecordsComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
