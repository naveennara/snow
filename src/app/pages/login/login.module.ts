import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
// import { AppPasswordDirective } from '../../togglepassword.directive';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChangepasswordModule } from '../changepassword/changepassword.module';
import { SharingModuleModule } from '../../sharing/sharing-module/sharing-module.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot(),
    CarouselModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    ChangepasswordModule,
    SharingModuleModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
