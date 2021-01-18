import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceClaimComponent } from './insurance-claim/insurance-claim.component';
import { InsuranceRoutingModule } from './insurance-routing/insurance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';

@NgModule({
  declarations: [InsuranceClaimComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InsuranceRoutingModule,
    SharingModuleModule
    
  ]
})
export class InsuranceClaimModule { }
