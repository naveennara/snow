import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config.interface';

export interface Field {
  config: FieldConfig;
  group: FormGroup;
  ispreview:string;
  isTable?:boolean
  tableWidgetId? :any;
  tableWidgetIndex? :any;
}
