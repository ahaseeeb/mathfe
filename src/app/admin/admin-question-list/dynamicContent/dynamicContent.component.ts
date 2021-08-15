import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'dynamic-content',
  templateUrl: './dynamicContent.component.html',
  styleUrls: ['./dynamicContent.component.css']
})
export class DynamicContentComponent implements AfterViewInit {

  @Input() question: any;

  constructor() { 
    
  }

  ngAfterViewInit() {
    let dom: any = document.querySelector('#contentContainer' + this.question.id);
    if (dom) dom.innerHTML = this.question.question; 
  }  
}
