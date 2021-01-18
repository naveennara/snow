import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Globals from '../../../globals';
import { InsuranceClaimService } from '../insurance-claim.service';

@Component({
  selector: 'app-insurance-claim',
  templateUrl: './insurance-claim.component.html',
  styleUrls: ['./insurance-claim.component.css']
})
export class InsuranceClaimComponent implements OnInit {
  noDataFound: boolean;
  recordData: {};
  constructor(private formBuilder: FormBuilder, private services: InsuranceClaimService) { }
  isFullLayout = true;
  orgImage = Globals.sliderImg1;
  dynamicSearch: FormGroup;
  tableData = [];
  loginDetails;
  ngOnInit() {
    this.dynamicSearch = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }
  getClaimDetails() {
    let url = Globals.urls.fetchClaimDoc + '/' + this.dynamicSearch.value.search.trim();
    this.services.getClaimDetails(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.tableData = res.data.formSkeleton.filter(obj => obj.type!='break');
            this.recordData = res.data.recordData;
            this.noDataFound = false;
          } else if (res.status === 204) {
            this.tableData = [];
            this.recordData = {};
            this.noDataFound = true;
          }
        } else {
          //this.toastr.error(res.data.message);
        }
      })
  }
  canDeactivate() {
    return false;
  }
}
