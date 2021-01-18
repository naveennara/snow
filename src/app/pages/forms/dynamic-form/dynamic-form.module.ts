import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormCheckBoxComponent } from './components/form-check-box/form-check-box.component';
import { FormTextAreaComponent } from './components/form-text-area/form-text-area.component'
import {FormDropDownComponent} from './components/form-drop-down/form-drop-down.component'
import { FormCameraComponent } from './components/form-camera/form-camera.component';
import { FormBarcodeComponent } from './components/form-barcode/form-barcode.component';
import { FormSignatureComponent } from './components/form-signature/form-signature.component';
import { FormRadioButtonComponent} from './components/form-radio-button/form-radio-button.component'
import { FormsModule } from '@angular/forms';
//import { IonicModule } from '@ionic/angular';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ValidationViewModule } from '../dynamic-form/validation/validation-view/validation-view.module';
import { FormVideoComponent } from './components/form-video/form-video.component';
import { FormRatingComponent } from './components/form-rating/form-rating.component';
import { FormCalendarComponent } from './components/form-calendar/form-calendar.component';
import { FormMapComponent } from './components/form-map/form-map.component';
import { FormCalculatorComponent } from './components/form-calculator/form-calculator.component';
import { FormNumberComponent } from './components/form-number/form-number.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { CommonFormactionViewComponent } from '../common-formaction-view/common-formaction-view.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormHeaderBreakComponent } from './components/form-header-break/form-header-break.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormTableComponent } from './components/form-table/form-table.component';
import { TableModalComponent } from './components/form-table/table-modal/table-modal.component';
import { CommonFormLabelsComponent } from './components/common-form-labels/common-form-labels.component';
import { FormTimeComponent } from './components/form-time/form-time.component';
import { FormUserPropertiesComponent } from './components/form-user-properties/form-user-properties.component';
import { SharingModuleModule } from '../../../sharing/sharing-module/sharing-module.module';
import { FormReferenceListComponent } from './components/form-reference-list/form-reference-list.component';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    BsDatepickerModule,
    ValidationViewModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    SharingModuleModule,
    HttpClientModule,
    LightboxModule

  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent,
    FormCheckBoxComponent,
    FormTextAreaComponent,
    FormDropDownComponent,
    FormCameraComponent,
    FormBarcodeComponent,
    FormSignatureComponent,
    FormRadioButtonComponent,
    FormVideoComponent,
    FormRatingComponent,
    FormCalendarComponent,
    FormMapComponent,
    FormCalculatorComponent,
    FormNumberComponent,
    FormHeaderComponent,
    CommonFormactionViewComponent,
    FormHeaderBreakComponent,
    FormTableComponent,
    TableModalComponent,
    CommonFormLabelsComponent,
    FormTimeComponent,
    FormUserPropertiesComponent,
    FormReferenceListComponent,
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormInputComponent,
    FormCheckBoxComponent,
    FormTextAreaComponent,
    FormDropDownComponent,
    FormCameraComponent,
    FormBarcodeComponent,
    FormSignatureComponent,
    FormRadioButtonComponent,
    FormVideoComponent,
    FormRatingComponent,
    FormCalendarComponent,
    FormMapComponent,
    FormCalculatorComponent,
    FormNumberComponent,
    FormHeaderComponent,
    FormHeaderBreakComponent,
    FormTableComponent,
    FormTimeComponent,
    FormUserPropertiesComponent,
    FormReferenceListComponent
    
  ],
  providers: [
    //BarcodeScanner
  ]
})
export class DynamicFormModule {}
