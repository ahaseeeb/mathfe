import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { House } from '../../models/house';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  houses: any;
  selectedHouse: House;
  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
    this.houses = this.dashboardService.getHouses();
    this.houses
      .subscribe(
        houses => {
          localStorage.setItem("EnrolledClassess", JSON.stringify(houses));
        },
        error => {
          console.error(<any>error);
        }
      );
  }

  onSelect(house: House) {
    //this.selectedEvent.emit(house);
    this.router.navigate(["/member/enrolled-class", house.id]);
  }

}
