export  class  widgetKeys {

    public static keys =  {
       label : 'label',
       _id    : 'id' ,
       disabled: 'disabled',
       placeholder : 'placeholder',
       options: 'options',
       optionDisplayName: 'displayValue',
       isRequired : 'isRequired',
       minLength: 'minLength',
       maxLength: 'maxLength',
       maximum: 'maximum',
       minimum: 'minimum',
       isUnderHeading : 'isUnderHeading',
       breakOf: 'breakOf',
       defaultValue: 'defaultValue',
       dependentField: 'isDependentField',
       type: 'type',
       isTable: 'isTable',
       minDate: 'minDate',
       maxDate: 'maxDate',
       typeOfDateSelected: 'typeOfDateSelected',
       timePeriod: 'timePeriod',
       maxTime: 'maxTime',
       minTime: 'minTime',
       dropdownType: 'dropdownType',
       dynamicDropdownTable: 'dynamicDropdownTable',
       columnName: 'columnName'

    };

    public static calculationKeys = {
      formula: 'formula',
      fieldList: 'fieldList',
      operator: 'operator',
      actions: {
          add: 'add',
          numeric: 'numeric',
          sub: 'sub',
          mul: 'mul',
          div: 'div',
          inv: 'inv',
          singleOperator: 'singleOperator',
          sqrt: 'sqrt',
          parentheses: '(',
          avg: 'avg'
      },
      formulaKeys: {
          id: 'id'
      }

  };

  public static fieldTypes = {
    select: 'select',
    heading: 'heading',
    break: 'break',
    rating: 'rating',
    table: 'table'
  };
  public static dependFields = {
    dependFields:"dependFields",
    Show:"Show",
    Hide:"Hide"
}
  public static dataTypes = {
    object: 'object',
    string: 'string'
  };
  public static userproperties = {
    divisionCode: 'Division Code',
    number: 'Phone Number',
    email: 'Email',
    name: 'Requestor Name'
};


}
