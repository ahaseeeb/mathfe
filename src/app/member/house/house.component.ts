import { Component, OnInit, Input} from '@angular/core';
import { House } from '../../models/house';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'ag-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  beURL = environment.apiURL + '/';
  
  @Input() house: House;
  constructor() { }

  ngOnInit() {
  }

}
