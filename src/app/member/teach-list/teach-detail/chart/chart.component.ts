import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ag-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartdata: any;
  // Doughnut
  public doughnutChartLabels: string[] = ['Underperform', 'Overperform', 'On Target'];
  public doughnutChartType: string = 'doughnut';

  public chartColors: Array<any> = [
    {
      /*
        Color must be same as base color:
        /media/amit/Stuff/Projects/Linux/PamelaLim/mathfeFork/src/styles.css
        :root {
          --underperform-bg-color   
          --overperform-bg-color   
          --on-target-bg-color  
        } 
       */
      backgroundColor: [
        'rgb(244, 203, 204)',// Underperform - Red
        'rgb(183, 202, 121)',// Overperform - Green
        'rgb(249, 221, 150)'// On Target - Yellow
      ]
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
