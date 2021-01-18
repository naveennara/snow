import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../home/form/form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormModule } from '../home/form/form.module';
import { FormSuccessComponent } from './form-success.component';
import { DeactivateGuardService } from './deactivate-guard.service';
import { FormExpiredComponent } from './form-expired/form-expired.component';
const routes: Routes = [
  {
    path: '',  component: FormComponent,canDeactivate:[DeactivateGuardService]
     
  },
  {
    path: 'success',  component: FormSuccessComponent, canDeactivate:[DeactivateGuardService]
     
  },
  {
    path:'expired',component:FormExpiredComponent,canDeactivate:[DeactivateGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormModule],
  exports: [RouterModule]
})
export class FormLinkRoutingModule { }
