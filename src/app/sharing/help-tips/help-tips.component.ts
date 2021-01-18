import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { DataService } from "../../pages/dataloader/body/data.service";

@Component({
  selector: 'app-help-tips',
  templateUrl: './help-tips.component.html',
  styleUrls: ['./help-tips.component.css'],
  providers: [DataService]
})
export class HelpTipsComponent implements OnInit {

  showHelpTip = true;
  helpOptions;
  constructor(private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.data.currentHelpInput.subscribe((help) => {
    this.showHelpTip = help["showHelpPane"];
      console.log(help)
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {

        if (event.url == "/mainLayout/dataloader") {
          this.showHelpTip = true;
        } else {
          this.showHelpTip = false;
        }

      }
    });

    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {

        if (!(e[0].urlAfterRedirects == "/mainLayout/dataloader/mapping"
          || e[0].urlAfterRedirects == "/mainLayout/dataloader/datamapper" ||
          e[0].urlAfterRedirects == "/mainLayout/dataloader") &&
          e[1].urlAfterRedirects == "/mainLayout/dataloader") {
          this.showHelpTip = true;
        } else {
          this.showHelpTip = false;
        }

        console.log(this.showHelpTip);

      });




  }

  closeHelpTip() {
    this.showHelpTip = false;
    
     var tmp = JSON;
    tmp["showHelpPane"] = this.showHelpTip;
    this.data.changeHelpInput(tmp);
  
  }

  showHelp() {
    this.data.currentHelpInput.subscribe((help) => {
      if(help["showHelpPane"]){
    this.showHelpTip = help["showHelpPane"];}
     // console.log(help)
    });
   // console.log(this.showHelpTip)
    return this.showHelpTip;
  }
}