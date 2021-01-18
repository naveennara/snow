import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
    let count = JSON.parse(sessionStorage.getItem('Count'));
    if (count == null || count < 1) {
      count = 1;
    } else {
      count = count + 1;
    }
    sessionStorage.setItem('Count', JSON.stringify(count));
  }

}
