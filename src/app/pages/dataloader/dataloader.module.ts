import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { DataLoaderRoutingModule } from './dataloader-routing.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';

import { ToastrModule } from 'ngx-toastr';
import { DataLoaderComponent } from './dataloader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';

import { MapComponent } from './map/map.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadModule } from './upload/upload.module';
import { DatalisterComponent } from './datalister/datalister.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BodyComponent } from './body/body.component';
import { DialogComponent } from './dialog/dialog.component';
import { MapinfoComponent } from './mapinfo/mapinfo.component';
import { ProgressComponent } from './progress/progress.component';
import {DndDirective} from '../../Directives/dnd.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ResizableModule } from 'angular-resizable-element';


@NgModule({
  declarations: [
    DataLoaderComponent,
    MapComponent,
    DndDirective, 
    ProgressComponent,
    DialogComponent,
    UploaderComponent,
    DatalisterComponent,
    BodyComponent,
    MapinfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PageHeaderModule,
    SharingModuleModule,
    NgxPaginationModule,
    DataLoaderRoutingModule,
    ReactiveFormsModule,
    NgxSmartModalModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([]),
    
    MatListModule,
    MatToolbarModule,
    UploadModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    TooltipModule,
    MatTreeModule,
    MatIconModule, 
    MatButtonModule,
    
    FormsModule,
    FileUploadModule,
    ResizableModule,
    // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    LeafletModule
    
  ],
  providers: [MapComponent],
  bootstrap: [DataLoaderComponent]
})
export class DataLoaderModule { }
