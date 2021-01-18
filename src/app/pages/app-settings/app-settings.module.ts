import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { AppsettingsComponent } from './appsettings/appsettings.component';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { AppSettingsRoutingModule } from './app-settings-routing.module';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { VersionHistoryComponent } from './components/version-history/version-history.component';


@NgModule({
  declarations: [SettingsComponent, AppsettingsComponent, VersionHistoryComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    AppSettingsRoutingModule,
    FormsModule,
    TooltipModule,
    SharingModuleModule
  ],
  exports: [VersionHistoryComponent]
})
export class AppSettingsModule { }
