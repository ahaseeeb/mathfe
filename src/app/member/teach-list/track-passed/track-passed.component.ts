import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ag-track-passed',
  templateUrl: './track-passed.component.html',
  styleUrls: ['./track-passed.component.css']
})
export class TrackPassedComponent implements OnInit {
  @Input() trackResult: any = []; 
  constructor() { }

  ngOnInit() {

  }
  closeModal() {
    this.trackResult = []; 
  }

}
