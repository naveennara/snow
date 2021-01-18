import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapLocationsComponent } from './map-locations/map-locations.component';

const routes: Routes = [
  {
    path: '',  component: MapLocationsComponent,
     
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapLocationsRoutingModule { }
