import { Component, OnInit } from '@angular/core';
import { webUserConstants } from '../webuser-constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-success',
  templateUrl: './form-success.component.html',
  styleUrls: ['./form-success.component.css']
})
export class FormSuccessComponent implements OnInit {
  constants = webUserConstants;
  formLoad: boolean = false;

  constructor(public activatedRoute: ActivatedRoute,public router: Router,
    ) { }

  ngOnInit() {
  }
  loadForm(){
    this.formLoad = true;
    this.router.navigate(['formLink',this.activatedRoute.snapshot.params.id]);
  }
  canDeactivate() {
    if(this.formLoad){
      return true;
    }else{
      return false;

    }

    // if the editName !== this.user.name
    // if (this.user.name !== this.editName) {
    //   return window.confirm('Discard changes?');
    // }

}

}
