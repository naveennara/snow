import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PageHeaderModule } from '../../sharing/page-header/page-header.module';
import { ProfileComponent } from './profile/profile.component';
import { MapConfigComponent } from './map-config/map-config.component';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { PrivilegesComponent } from './privileges/privileges.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DynamicDropdownComponent } from './dynamic-dropdown/dynamic-dropdown.component';
import { DynamicDropdownCreateComponent } from './dynamic-dropdown/dynamic-dropdown-create/dynamic-dropdown-create.component';
import { DynamicDropdownEditComponent } from './dynamic-dropdown/dynamic-dropdown-edit/dynamic-dropdown-edit.component';
import { DropdownTableComponent } from './dynamic-dropdown/dropdown-table/dropdown-table.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { SecurityComponent } from './security/security.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LayerCompComponent} from './dynamic-layers/layer-comp/layer-comp.component';
import { LayerCreateComponent } from './dynamic-layers/layer-create/layer-create.component';
import { LayerEditComponent } from './dynamic-layers/layer-edit/layer-edit.component';
import { LayerListComponent } from './dynamic-layers/layer-list/layer-list.component';

@NgModule({
  declarations: [SettingsComponent,
                 ProfileComponent,
                 MapConfigComponent,
                 SettingsListComponent, 
                 PrivilegesComponent, 
                 ConfigurationsComponent, 
                 DynamicDropdownComponent, 
                 DynamicDropdownCreateComponent, 
                 DynamicDropdownEditComponent, 
                 DropdownTableComponent, 
                 SecurityComponent, 
                 AccountSettingsComponent,
                 LayerCompComponent,
                 LayerCreateComponent,
                 LayerEditComponent,
                 LayerListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule,
    SettingsRoutingModule,
    NgSelectModule,
    SharingModuleModule,
    NgxPaginationModule,

  ]
})
export class SettingsModule { }
