import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsynDownloadsComponent } from './asyn-downloads.component';

const routes: Routes = [
  {
    path :'',component: AsynDownloadsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsynDownloadsRoutingModule { }
