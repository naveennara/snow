import { Component, OnInit,Input } from '@angular/core';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-common-form-labels',
  templateUrl: './common-form-labels.component.html',
  styleUrls: ['./common-form-labels.component.css']
})
export class CommonFormLabelsComponent implements OnInit {
  @Input() widget;
  @Input() type;
   WidgetInfo;
   widgets = {  textBox : { displayText: 'Input', displayIcon: Globals.svgIcons.textBox },
   number : {displayText: 'Number', displayIcon: Globals.svgIcons.number } ,
    textArea : {displayText: 'TextArea', displayIcon: Globals.svgIcons.textArea},
    camera : {displayText: 'Camera', displayIcon: Globals.svgIcons.camera},
    video:{displayText: 'Video', displayIcon: Globals.svgIcons.video_camera},
    signature:{displayText: 'Signature', displayIcon: Globals.svgIcons.signature},
    rating : { displayText: 'Rating', displayIcon: Globals.svgIcons.rating },
    checkBox :{displayText: 'Checkbox', displayIcon: Globals.svgIcons.checkBox},
    radio : {displayText: 'Radio', displayIcon: Globals.svgIcons.radio },
    select :{displayText: 'Dropdown', displayIcon: Globals.svgIcons.dropdown},
    map : {displayText: 'Map', displayIcon: Globals.svgIcons.map},
    calendar:{displayText: 'Calendar', displayIcon: Globals.svgIcons.calendar},
    calculation:{displayText: 'Calculator', displayIcon: Globals.svgIcons.calculator},
    barcode:{displayText: 'Barcode', displayIcon: Globals.svgIcons.barcode},
    time:{displayText: 'Time', displayIcon: Globals.svgIcons.time},
    properties:{displayText: 'User Properties', displayIcon: Globals.svgIcons.userProperties},
    referenceList:{displayText: 'Reference List', displayIcon: Globals.svgIcons.referenceList},

 }
  constructor() { }

  ngOnInit() {
    this.WidgetInfo = this.widgets[this.widget.type];
  }
  ngOnChanges(){
    this.WidgetInfo = this.widgets[this.widget.type]
  }
}
