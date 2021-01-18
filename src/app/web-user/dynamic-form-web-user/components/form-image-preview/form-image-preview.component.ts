import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { webUserConstants } from '../../../webuser-constant';

@Component({
  selector: 'app-form-image-preview',
  templateUrl: './form-image-preview.component.html',
  styleUrls: ['./form-image-preview.component.css']
})
export class FormImagePreviewComponent implements OnInit {
  @Input()
  modalRef: any;
  @Input() imgSrc: any;
  @Input() actionType: any;
  @Input() isHistory = false;
  @Output() removeImage = new EventEmitter();
  constructor() { }
  reassignActionType =  webUserConstants.formReassignActionType;
  ngOnInit() {
  }

  removeImageRef() {
    this.removeImage.emit('remove');
  }
}
