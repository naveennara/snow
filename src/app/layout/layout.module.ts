import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderModalComponent } from './header/header-modal/header-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharingModuleModule } from '../../app/sharing/sharing-module/sharing-module.module';
import { QuickSidebarModule } from '../sharing/quick-sidebar/quick-sidebar.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HeaderFilterComponent } from './header/header-filter/header-filter.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { HelpTipsComponent } from '../sharing/help-tips/help-tips.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ModalModule.forRoot(),
    SharingModuleModule,
    QuickSidebarModule,
    BsDropdownModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    TooltipModule,
    // Ng2SearchPipeModule,
    NgSelectModule,
  ],
  exports: [
    MainLayoutComponent
  ],
  declarations: [
    MainLayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    HeaderModalComponent,
    HeaderFilterComponent,
    HelpTipsComponent
  ],
  // entryComponents: [HeaderModalComponent]
})
export class LayoutModule { }
