import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceManagementComponent } from './device-management.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevicesDeleteComponent } from './devices-delete/devices-delete.component';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
// import { SampletableModule } from '../sampletable/sampletable.module';
import { SortingTableModule } from '../../sharing/sorting-table/sorting-table.module'
import { NgSelectModule } from '@ng-select/ng-select';
import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DeviceManagementListComponent } from './device-management-list/device-management-list.component';


@NgModule({
  declarations: [DeviceManagementComponent, DevicesDeleteComponent, DeviceManagementListComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    PageHeaderModule,
    SharingModuleModule,
    NgSelectModule,
    DeviceManagementRoutingModule,
    // SampletableModule,
    SortingTableModule,
    TooltipModule
  ]
})

export class DeviceManagementModule { }
