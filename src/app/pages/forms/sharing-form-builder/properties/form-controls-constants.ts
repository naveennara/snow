 export class widgetProperties {
    public static widgets = {
        textBox : ['label','disabled','displayName','isRequired','minLength','maxLength','placeholder','defaultValue','typeChange'],
        number : ['label','disabled','displayName','isRequired','minLength','maxLength','placeholder','defaultValue','typeChange'],
        textArea : ['label','disabled','displayName','isRequired','minLength','maxLength','placeholder','defaultValue','typeChange'],
        camera :['label','isRequired', 'isGeotagginEnable'],
        video:['label','isRequired','videoDuration'],
        signature:['label','isRequired'],
        rating : ['label','displayName','isRequired','minimum','maximum','typeChange'],
        checkBox :['label','disabled','displayName','isRequired','options','typeChange','defaultValue'],
        radio :['label','disabled','displayName','isRequired','options','typeChange','defaultValue'],
        select :['label','disabled','displayName','isRequired','options','isAllowMultiselection','typeChange','defaultValue'],
        map : ['label','isRequired','disabled'],
        calendar:['label','minDate','maxDate','typeOfDateSelected','typeChange','defaultValue'],
        calculation:['label','formula'],
        heading:['label','isRequired'],
        barcode:['label', 'isRequired'],
        time: ['label','disabled','isRequired','minTime','maxTime','timePeriod','placeholder'],
        properties : ['label'],
        referenceList:['label','disabled','displayName','isRequired','dynamicDropdownTable','columnName','isAllowMultiselection','typeChange','defaultValue'],
    }
}