import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataLoaderComponent } from './dataloader.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';
   
import {BodyModule} from './body/body.module';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { AuthGuard } from '../../auth-guard.service';


import { DatalisterComponent } from './datalister/datalister.component';
import { MapComponent } from './map/map.component';


const routes: Routes = [
  {
    path: '', component: BodyComponent,canActivate: [AuthGuard],
    children: [
      { path: 'datamapper', component: DatalisterComponent,canDeactivate:[DeactivateGuardService] },
      { path: 'mapping', component: MapComponent,canDeactivate:[DeactivateGuardService] }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})


    export class DataLoaderRoutingModule { }
    