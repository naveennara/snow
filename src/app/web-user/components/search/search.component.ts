import { Component, OnInit, Input,Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent : EventEmitter<any> = new EventEmitter<any>()
  search: string;
  dynamicSearch: FormGroup;
  
  constructor(private formBuilder: FormBuilder
              ) { }
  ngOnInit() {
    this.dynamicSearch = this.formBuilder.group({
      search: ['']
    });
  }
  get f() { return this.dynamicSearch.controls; }
  pageSearch() {
    this.searchEvent.emit({search: this.dynamicSearch.value.search.trim()});
   // this.commonService.search.next({search: this.dynamicSearch.value.search.trim()});
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
