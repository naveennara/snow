import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLocationsComponent } from './map-locations/map-locations.component';
import { MapLocationsRoutingModule } from './map-locations-routing.module';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
@NgModule({
  declarations: [MapLocationsComponent],
  imports: [
    CommonModule,
    MapLocationsRoutingModule,
    SharingModuleModule
  ]
})
export class MapLocationsModule { }
