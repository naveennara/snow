import { Component, OnInit,Output,Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toogle',
  templateUrl: './toogle.component.html',
  styleUrls: ['./toogle.component.css']
})
export class ToogleComponent implements OnInit {
  @Input() value;
  @Input() idfor;
  @Input() labels; 
  @Input() disableList;
  @Output() changed = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  
}
