import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import * as Globals from '../../../../globals';
import { CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatList } from '@angular/material/list';
@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  //@ViewChild(MatList, /* TODO: add static flag */ { read: ElementRef,static:false }) child: ElementRef;

  constructor(public elRef: ElementRef) { }
  _currentIndex;
  _currentField;
  widgetIcons = Globals.svgIcons;
  dragEnabled = true;
  formWidgets = [
    { type: Globals.widgetTypes.widgets.textBox, placeholder: null, displayText: 'Input', displayIcon: this.widgetIcons.textBox },
    { type: Globals.widgetTypes.widgets.textArea, placeholder: null, displayText: 'TextArea', displayIcon: this.widgetIcons.textArea },
    { type: Globals.widgetTypes.widgets.select, placeholder: null, displayText: 'Dropdown', displayIcon: this.widgetIcons.dropdown },
    { type: Globals.widgetTypes.widgets.checkBox, placeholder: null, displayText: 'Checkbox', displayIcon: this.widgetIcons.checkBox },
    { type: Globals.widgetTypes.widgets.radio, placeholder: null, displayText: 'Radio', displayIcon: this.widgetIcons.radio },
    { type: Globals.widgetTypes.widgets.number, placeholder: null, displayText: 'Number', displayIcon: this.widgetIcons.number },
    { type: Globals.widgetTypes.widgets.rating, placeholder: null, displayText: 'Rating', displayIcon: this.widgetIcons.rating },
    { type: Globals.widgetTypes.widgets.calendar, placeholder: null, displayText: 'Calendar', displayIcon: this.widgetIcons.calendar }
  ];
  mediaWidgets = [
    { type: Globals.widgetTypes.widgets.camera, placeholder: null, displayText: 'Camera', displayIcon: this.widgetIcons.camera },
    { type: Globals.widgetTypes.widgets.video, placeholder: null, displayText: 'Video', displayIcon: this.widgetIcons.video_camera },
    { type: Globals.widgetTypes.widgets.signature, placeholder: null, displayText: 'Signature', displayIcon: this.widgetIcons.signature },
    { type: Globals.widgetTypes.widgets.barcode, placeholder: null, displayText: 'Barcode', displayIcon: this.widgetIcons.barcode }
  ];
  addOnWidgets = [
    {
      type: Globals.widgetTypes.widgets.calculation,
      placeholder: 'Calculator',
      displayText: 'Calculator',
      displayIcon: this.widgetIcons.calculator
    },
    { type: Globals.widgetTypes.widgets.header, placeholder: null, displayText: 'Header', displayIcon: this.widgetIcons.header },
   // { type: Globals.widgetTypes.widgets.pageBreak, placeholder: null, displayText: 'Page Break', displayIcon: this.widgetIcons.pageBreak },
    { type: Globals.widgetTypes.widgets.map, placeholder: null, displayText: 'Map', displayIcon: this.widgetIcons.map },
    { type: Globals.widgetTypes.widgets.table, placeholder: null, displayText: 'Table', displayIcon: this.widgetIcons.table },
    { type: Globals.widgetTypes.widgets.time, placeholder: null, displayText: 'Time', displayIcon: this.widgetIcons.time },
    { type: Globals.widgetTypes.widgets.properties, placeholder: null, displayText: 'Properties', displayIcon: this.widgetIcons.userProperties },
    { type: Globals.widgetTypes.widgets.referenceList, placeholder: null, displayText: 'ReferenceList', displayIcon: this.widgetIcons.referenceList }

  ];
  dragStart(event: CdkDragStart) {
   // this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
    // this._currentIndex = this.addOnWidgets.indexOf(event.source.data); // Get index of dragged type
    // this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
  }

  moved(event: CdkDragMove) {
   // this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
    // Check if stored HTML field is as same as current field
    // if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
    //   // Replace current field, basically replaces placeholder with old HTML content
    //   this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    // }
  }

  ngOnInit() {
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'auto';
  }
}
