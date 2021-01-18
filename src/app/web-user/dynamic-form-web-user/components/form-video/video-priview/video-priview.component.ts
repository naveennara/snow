import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { webUserConstants } from '../../../../webuser-constant';


@Component({
  selector: 'app-video-priview',
  templateUrl: './video-priview.component.html',
  styleUrls: ['./video-priview.component.css']
})
export class VideoPriviewComponent implements OnInit {
  @Input()
  modalRef: any;
  @Input() videoSrc: any;
  @Input() actionType: any;
  @Input() isHistory = false;
  @Output() removeVideo = new EventEmitter();
  constructor() { }
  reassignActionType =  webUserConstants.formReassignActionType;

  ngOnInit() {
  }
  removeVideoRef() {
    this.removeVideo.emit('remove');
  }
}
