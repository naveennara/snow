import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attachment-progress',
  templateUrl: './attachment-progress.component.html',
  styleUrls: ['./attachment-progress.component.scss']
})
export class AttachmentProgressComponent implements OnInit {
  @Input() progress = 0;
  constructor() { }

  ngOnInit() {
  }

}
