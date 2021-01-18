import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-common-formaction-view',
  templateUrl: './common-formaction-view.component.html',
  styleUrls: ['./common-formaction-view.component.css']
})
export class CommonFormactionViewComponent implements OnInit {
  @Input() config: FieldConfig;
  changewidgetsList = ['textBox','number','textArea','rating','checBox','select','radio','referenceList','calendar']
  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }
  editProperties() {
    this.commonService.editPropertiesWithTypeChange.next(false);
    this.commonService.editProperties.next(this.config);
   }
  deleteWidget() {
    
    this.commonService.deleteWidget.next(this.config);
  }

  editPropertiesWithChangeType() {
    this.config['isTypeChange'] = true;
    this.commonService.editProperties.next(this.config);
    this.commonService.editPropertiesWithTypeChange.next(true);
  }
  
}
