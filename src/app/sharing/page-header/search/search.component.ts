import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../sharing-module/common.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()
  headerInputs: any;
  @Input()
  clear:any;
  search: string;
  dynamicSearch: FormGroup;
  constructor(private formBuilder: FormBuilder,public router: Router,
              private commonService: CommonService) { 
                router.events.subscribe(val => {
                 if(this.dynamicSearch){
                  this.dynamicSearch.patchValue({
                    search: ''
                  });
                }
                });
              }
  ngOnInit() {
    
    this.dynamicSearch = this.formBuilder.group({
      search: ['']
    });
  }
  get f() { return this.dynamicSearch.controls; }
  pageSearch() {
    this.commonService.search.next({search: this.dynamicSearch.value.search.trim()});
    }
  clearSearch() {
    this.dynamicSearch.patchValue({
      search: ''
    });
    this.pageSearch();
  }
  onchangeSearchValue(event) {
    if (event.target.value === '') {
      this.clearSearch();
    } else {
      return;
    }
  }
  onEnter(event) {
    if (event.keyCode === 13) {
      this.pageSearch();
    }
  }
  
}
