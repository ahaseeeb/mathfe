import { Component, Input } from '@angular/core';

@Component({
  selector: 'ag-studentradar',
  templateUrl: './studentradar.component.html',
  styleUrls: ['./studentradar.component.css']
})

export class StudentradarComponent {
  @Input() radarChartLabels: any;
  @Input() radarChartData: any;

  public radarChartType:string = 'radar';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
