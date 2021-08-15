import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs/Observable';
declare var $: any;
@Component({
  selector: 'ag-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  @Input() user: any;

  editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  isUserLoaded(user) {
    if (!user) {
      $(".spinner-footer-envelope").show();
      return false;
    } else { 
      $(".spinner-footer-envelope").hide();
      return true;
    }
  } I
  userprof() {
    this.editing = this.editing ? false : true;
  }
  updateEditMode(iseditmode: boolean) {
    this.editing = iseditmode;
  }

}
