import { objcetKeyConstants } from './../../object-key-constatnts';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-info-model',
  templateUrl: './info-model.component.html',
  styleUrls: ['./info-model.component.css']
})
export class InfoModelComponent implements OnInit {
  @Input() data: any ;
  @Input() modalRef: any ;
  @Input() actionPage: any;
  formInfoKeys = objcetKeyConstants.formInfoKeys;
  constructor() { }

  ngOnInit() {
  }

}
