import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import {FormCheckBoxComponent} from './components/form-check-box/form-check-box.component';
import {FormTextAreaComponent} from './components/form-text-area/form-text-area.component';
import {FormDropDownComponent} from './components/form-drop-down/form-drop-down.component';
import {FormRadioButtonComponent} from './components/form-radio-button/form-radio-button.component';
import { FormHeaderComponent } from './components/form-heading/form-heading.component';
import { FormsModule } from '@angular/forms';
import { FormRatingComponent } from './components/form-rating/form-rating.component';
// import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { FormDataDistributionService} from './form-data-distribution.service';
import { FormHeadingBreakComponent} from './components/form-heading-break/form-heading-break.component';
import { ValidationViewModule } from './../dynamic-form-web-user/validation/validation-view/validation-view.module';

// this addinallyt  addedd for web suer drop down

import { NgSelectModule } from '@ng-select/ng-select';
import { FormTimeComponent } from './components/form-time/form-time.component';
import { OnlynumbersallowDirective } from './directives/onlynumbersallow.directive';
import { FormNumberComponent } from './components/form-number/form-number.component';
import { FormCalculationComponent } from './components/form-calculation/form-calculation.component';
import { FormTableComponent } from './components/form-table/form-table.component';
import { FormTableAddRowComponent } from './components/form-table/form-table-add-row/form-table-add-row.component';
import { FormFileUploadComponent } from './components/form-file-upload/form-file-upload.component';
import { FormImagePreviewComponent } from './components/form-image-preview/form-image-preview.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormUserPropertiesComponent } from './components/form-user-properties/form-user-properties.component';
import { FormVideoComponent } from './components/form-video/form-video.component';
import { VideoPriviewComponent } from './components/form-video/video-priview/video-priview.component';
import { FormImageComponent } from './components/form-image/form-image.component'
import { Ng5SliderModule } from 'ng5-slider';
import { FormReferenceListComponent } from './components/form-reference-list/form-reference-list.component';
import { CalendarDirective } from './directives/calendar.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ValidationViewModule,
    NgSelectModule,
    BsDatepickerModule,
    Ng5SliderModule,
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent,
    FormCheckBoxComponent,
    FormTextAreaComponent,
    FormDropDownComponent,
    FormRadioButtonComponent,
    FormRatingComponent,
    FormHeaderComponent,
    FormHeadingBreakComponent,
    FormTimeComponent,
    OnlynumbersallowDirective,
    FormNumberComponent,
    FormCalculationComponent,
    FormTableComponent,
    FormTableAddRowComponent,
    FormFileUploadComponent,
    FormImagePreviewComponent,
    FormDateComponent,
    FormUserPropertiesComponent,
    FormVideoComponent,
    VideoPriviewComponent,
    FormImageComponent,
    FormReferenceListComponent,
    CalendarDirective
  ],
  exports: [
    DynamicFormComponent,
    OnlynumbersallowDirective
  ],
  entryComponents: [
    FormInputComponent,
    FormCheckBoxComponent,
    FormTextAreaComponent,
    FormDropDownComponent,
    FormRadioButtonComponent,
    FormRatingComponent,
    FormHeaderComponent,
    FormHeadingBreakComponent,
    FormTimeComponent,
    FormNumberComponent,
    FormCalculationComponent,
    FormTableComponent,
    FormFileUploadComponent,
    FormDateComponent,
    FormUserPropertiesComponent,
    FormVideoComponent,
    FormImageComponent,
    FormReferenceListComponent,
    
  ],
  providers: [
    FormDataDistributionService
  ]
})
export class DynamicFormModule {}
