import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModuleModule } from '../../sharing-module/sharing-module.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharingModuleModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
