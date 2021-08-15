import { Component, Input } from '@angular/core';

@Component({
  selector: 'ag-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {
  @Input() tracksdata: any;
  @Input() barChartData: any;

 public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {display: false}
  };
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
//  public barChartData:any[] = [
 //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Average Maxile'},
 // ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
}
