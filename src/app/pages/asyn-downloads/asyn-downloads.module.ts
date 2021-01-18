import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsynDownloadsComponent } from './asyn-downloads.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { AsynDownloadsRoutingModule } from './asyn-downloads-routing.module';
// import {OrderBy} from '../../sharing/sharing-module/orderby.pipe';
// import {Format} from '../../sharing/sharing-module/format.pipe';
@NgModule({
  declarations: [AsynDownloadsComponent],
  imports: [
    CommonModule,
      NgxPaginationModule,
      SharingModuleModule,
      AsynDownloadsRoutingModule
  ]
})
export class AsynDownloadsModule {
}
