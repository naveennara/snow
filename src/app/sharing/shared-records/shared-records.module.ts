import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRecordsComponent } from './shared-records/shared-records.component';
import { AgGridModule } from 'ag-grid-angular';
import { GetRecordsComponent } from './get-records/get-records.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MediaWidgetsComponent } from './media-widgets/media-widgets.component';
import { FullRecordViewComponent } from './full-record-view/full-record-view.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DynamicFormModule } from '../../pages/forms/dynamic-form/dynamic-form.module';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { AttachedDocumentsComponent } from './attached-documents/attached-documents.component';
import { DateWidgetsComponent } from './date-widgets/date-widgets.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { LeafletComponent } from './leaflet/leaflet.component';

@NgModule({
  declarations: [SharedRecordsComponent, GetRecordsComponent, MediaWidgetsComponent, FullRecordViewComponent, AttachedDocumentsComponent, DateWidgetsComponent,GooglemapsComponent,LeafletComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    AgGridModule.withComponents([MediaWidgetsComponent,FullRecordViewComponent,DateWidgetsComponent]),
    PaginationModule.forRoot(),
    DynamicFormModule,
    SharingModuleModule
  ],
  exports: [SharedRecordsComponent, GetRecordsComponent,AttachedDocumentsComponent]
})
export class SharedRecordsModule { }
