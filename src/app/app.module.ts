//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { LoginModule } from './pages/login/login.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, POSITION } from 'ngx-ui-loader';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuickSidebarModule } from '../app/sharing/quick-sidebar/quick-sidebar.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { WorkAssignmentsModule } from './pages/work-assignments/work-assignments.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserIdleModule } from 'angular-user-idle';
import { ToastrModule } from 'ngx-toastr';
import { LoginAuthService } from './login-auth.service';
import { NoCacheHeadersInterceptor } from './no-cache.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import * as Globals from './globals';

const ngxUiLoaderConfig: NgxUiLoaderConfig = { bgsPosition: POSITION.bottomCenter  };
@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    //BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginModule,
    LayoutModule,
    HttpClientModule,
    StorageServiceModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ exclude: [Globals.urls.login,Globals.urls.pwdCheckforChangePassword] }),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    QuickSidebarModule,
    NgSelectModule,
    AccordionModule.forRoot(),
    WorkAssignmentsModule,
    UserIdleModule.forRoot({idle:300, timeout:90, ping:30}),
    ToastrModule. forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TooltipModule.forRoot(),
    // ChangepasswordModule
  ],
  exports: [ ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ServerService, AuthService, AuthGuard,LoginAuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: NoCacheHeadersInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
