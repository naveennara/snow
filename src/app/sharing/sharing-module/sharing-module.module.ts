import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe} from './filter.pipe';
import { NumberDirective } from '../../Directives/numbers-only.directive';
import { AppPasswordDirective } from '../../../app/togglepassword.directive';
import { SpecialCharacterDirective } from '../../Directives/special-character.directive';
import { DeleteTemplateComponent } from './delete-template/delete-template.component';
import { ConfirmTemplateComponent } from './confirm-template/confirm-template.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ScrollToBottomDirective } from '../../Directives/scroll-to-bottom.directive';
import { OrderBy } from './orderby.pipe';
import { Format } from './format.pipe';
import { TimeHrsPipe } from './time-hrs.pipe';
import { NofdaysPipe } from './nofdays.pipe';
import { ToogleComponent } from './toogle.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { TrimmingPipe } from './trimming.pipe';
import { RemoveSpacePipe } from './remove-space.pipe';
import { NoWhitespaceDirective } from '../../Directives/no-whitespace.directive';
import { CalendarDirective } from '../../Directives/calendar.directive';
import { TypeCheckPipe } from './type-check.pipe';
import { TrimValuesDirective } from './trim-values.directive';


// import { AutofocusDirective } from '../../Directives/auto-focus.directive';
// import { SlimScroll } from '../../Directives/slimscroll.directive';

@NgModule({
  declarations: [
    FilterPipe,
    ShortenPipe,
    NumberDirective,
    AppPasswordDirective,
    SpecialCharacterDirective,
    DeleteTemplateComponent,
    ConfirmTemplateComponent,
    ScrollToBottomDirective,
    OrderBy,
    Format,
    TimeHrsPipe,
    NofdaysPipe,
    ToogleComponent,
    TrimmingPipe,
    RemoveSpacePipe,
    NoWhitespaceDirective,
    CalendarDirective,
    TypeCheckPipe,
    TrimValuesDirective ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  exports: [
    FilterPipe,
    ShortenPipe,
    NumberDirective,
    AppPasswordDirective,
    SpecialCharacterDirective,
    DeleteTemplateComponent,
    ConfirmTemplateComponent,
    OrderBy,
    Format,
    TimeHrsPipe,
    NofdaysPipe,
    ToogleComponent,
    TrimmingPipe,
    RemoveSpacePipe,
    NoWhitespaceDirective,
    CalendarDirective,
    TypeCheckPipe,
    TrimValuesDirective
  ]
})
export class SharingModuleModule { }
