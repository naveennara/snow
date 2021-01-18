import { Component, OnInit } from '@angular/core';
import {CategoriesService} from './categories.service';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {
  pageDetails = {pageName : 'Categories', pageIcon: Globals.headerIcons.categoriesGrey};
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  constructor() { }

  ngOnInit() {
    this.ellipseList = ['Create'];
    this.headerInputs = [HeaderInputs.keys.categories];
  }

}
