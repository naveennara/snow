import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  label?: string;
  options?: object[];
  placeholder?: string;
  type: string;
  value?: any;
  defaultValue?: any;
  dataType?: string;
  minLength?: number;
  maxLength?: number;
  id: string;
  isRequired?: boolean;
  isTable?:boolean;
}
