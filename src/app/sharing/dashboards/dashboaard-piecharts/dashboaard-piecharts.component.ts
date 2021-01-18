import { Component, OnInit,Input,Output ,EventEmitter} from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Globals from '../../../globals';

@Component({
  selector: 'app-dashboaard-piecharts',
  templateUrl: './dashboaard-piecharts.component.html',
  styleUrls: ['./dashboaard-piecharts.component.css']
})
export class DashboaardPiechartsComponent implements OnInit {
  @Input() selected;
  @Input() data;
  @Output() closePieChart :  EventEmitter<any> = new EventEmitter<any>(); 
  constants = Globals.dashboardConstansts.dashboardkeys;
  pieData;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(77, 121, 255)', 'rgba(66, 51, 232)', 'rgba(0,0,255,0.3)'],
    },
  ];
  constructor() { }

  ngOnInit() {
    this.pieData = Object.assign({},this.data[this.selected]);
    delete this.pieData['count'];
    this.pieChartLabels = Object.keys(this.pieData).map(key => this.constants[key]);
    this.pieChartData = Object.keys(this.pieData).map(key => this.data[this.selected][key]);
  }
  close(selected){
    this.closePieChart.emit(selected);
  }

}
