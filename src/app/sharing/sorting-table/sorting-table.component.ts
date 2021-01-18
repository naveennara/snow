import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sorting-table',
  templateUrl: './sorting-table.component.html',
  styleUrls: ['./sorting-table.component.css']
})
export class SortingTableComponent implements OnInit {
  @Input() columns: any[];
  @Input() data: any[];
  @Input() sort: any;
  constructor() { }

  ngOnInit() {
  }
  selectedClass(columnName){
    return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
  }
  changeSorting(columnName): void{
    var sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }
  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }

}
