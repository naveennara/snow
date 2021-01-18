import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FormCreateModalComponent } from './form-create-modal/form-create-modal.component';
import { FormBuilderComponent } from './sharing-form-builder/form-builder/form-builder.component';
import { FormEditModalComponent } from './form-edit-modal/form-edit-modal.component';
import { VersionHistoryComponent } from './version-history/version-history.component';
import { GetRecordsComponent } from '../../sharing/shared-records/get-records/get-records.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';

const routes: Routes = [
  {
    path: '', component: FormsComponent,
        children: [
          { path: '', component: FormsListComponent },
          { path: 'create', component: FormCreateModalComponent,canDeactivate:[DeactivateGuardService] },
          { path: 'formbuilder', component: FormBuilderComponent,canDeactivate:[DeactivateGuardService] },
          { path: 'edit/:formId', component: FormEditModalComponent,canDeactivate:[DeactivateGuardService] },
          { path: 'getRecords/:formId/:formName', component: GetRecordsComponent },
          { path: 'versionHistory/:formId', component: VersionHistoryComponent }
        ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
