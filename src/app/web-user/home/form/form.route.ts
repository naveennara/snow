
import { FormComponent } from './form.component';
import { Route } from '@angular/router';
import { DeactivateGuardService } from '../../form-link/deactivate-guard.service';
export const formroutes:Route[] =[
  
     {path:'',component:FormComponent,canDeactivate:[DeactivateGuardService]}
]