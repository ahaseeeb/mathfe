import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ag-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  game_leaders: any;
  maxile_leaders: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getLeaders().subscribe(
	  data => {
	    this.game_leaders = data['game_leaders'];
	    this.maxile_leaders = data['maxile_leaders'];
	  },
	  error =>  console.error(<any>error));
  }
}