import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { MapConfigComponent } from './map-config/map-config.component';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { ProfileComponent } from './profile/profile.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DynamicDropdownComponent } from './dynamic-dropdown/dynamic-dropdown.component';
import { DynamicDropdownCreateComponent } from './dynamic-dropdown/dynamic-dropdown-create/dynamic-dropdown-create.component';
import { DeactivateGuardService } from '../../deactivate-guard.service';
import { SecurityComponent } from './security/security.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LayerListComponent } from './dynamic-layers/layer-list/layer-list.component';
import { LayerCreateComponent } from './dynamic-layers/layer-create/layer-create.component';
import { LayerEditComponent } from './dynamic-layers/layer-edit/layer-edit.component'
const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
      { path: '', component: SettingsListComponent },
      {
      path: 'map', component: MapConfigComponent 
      },
      { path :'profile',component : ProfileComponent,canDeactivate:[DeactivateGuardService]},
      {
        path :'privileges', component : PrivilegesComponent
      },
      {
        path : 'configurations',component:ConfigurationsComponent,canDeactivate:[DeactivateGuardService]
      },
      {
        path : 'dropdown',component:DynamicDropdownComponent,canDeactivate:[DeactivateGuardService]
      },
      {
        path : 'dropdownCreate',component:DynamicDropdownCreateComponent,canDeactivate:[DeactivateGuardService]
      },
      {
        path : 'security',component:SecurityComponent
      },
      {
        path : 'accountSettings',component:AccountSettingsComponent
      },
      {
        path : 'layerConf',component:LayerListComponent,canDeactivate:[DeactivateGuardService]
      },
      {
        path : 'layerCreate',component:LayerCreateComponent,canDeactivate:[DeactivateGuardService]
      },
      {
        path : 'layerEdit/:externalName',component:LayerEditComponent,canDeactivate:[DeactivateGuardService]
      }
      
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
