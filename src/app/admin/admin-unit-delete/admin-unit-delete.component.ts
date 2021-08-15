import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ag-admin-unit-delete',
  templateUrl: './admin-unit-delete.component.html',
  styleUrls: ['./admin-unit-delete.component.css']
})
export class AdminUnitDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private unitService: UnitService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.unitService.deleteUnit(this.id).subscribe(
      data => {
        this.unitService.updateStatus = data['message'];
        setTimeout(() => this.unitService.updateStatus = '', 2000);
        this.router.navigate(['/admin/units']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        this.msg = this.helperService.ParseErrorMsg(error);
      }
    )
  };
  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
