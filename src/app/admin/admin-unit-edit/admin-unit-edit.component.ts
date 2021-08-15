import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-unit-edit',
  templateUrl: './admin-unit-edit.component.html',
  styleUrls: ['./admin-unit-edit.component.css']
})
export class AdminUnitEditComponent implements OnInit, OnDestroy {

  status: string;
  message: string;
  id: any;
  params: any;


  unit = new Unit('id', 'unit', 'description');

  constructor(
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.unitService.getUnit(this.id).subscribe(
      data => {
        this.unit = data;
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateUnit(unit: Unit) {
    this.unitService.updateUnit(unit)
      .subscribe(
        unit => {
          this.status = 'success';
          this.message = unit['message'];
          this.unitService.updateStatus = this.message = unit['message'];
          setTimeout(() => this.unitService.updateStatus = '', 2000);
          this.router.navigate(['/admin/units']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }
}
