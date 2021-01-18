import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceClaimComponent } from '../insurance-claim/insurance-claim.component';
import { DeactivateGuardService } from '../../../deactivate-guard.service';

const routes: Routes = [
  {
    path: '',  component: InsuranceClaimComponent,canDeactivate:[DeactivateGuardService] 
     
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
