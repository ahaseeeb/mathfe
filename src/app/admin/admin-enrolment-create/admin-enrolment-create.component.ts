import { Component, OnInit } from '@angular/core';
import { EnrolmentService } from '../../services/enrolment.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-admin-enrolment-create',
  templateUrl: './admin-enrolment-create.component.html',
  styleUrls: ['./admin-enrolment-create.component.css']
})
export class AdminEnrolmentCreateComponent implements OnInit {
  public status: string;
  public message: string;
  loading: boolean = false;
  currencies = [];
  roles = [];
  users = [];
  filteredUsers = [];
  houses = [];
  selectedUser;
  selectedHouse = { price: '0' };
  constructor(private enrolmentService: EnrolmentService,
    private router: Router, private helperService: HelperService) { }

  public createEnrolment(enrolment): void {
    this.loading = true;
    var d = {
      user: enrolment.name,
      role: enrolment.role,
      currency_code: enrolment.currency,
      house_id: enrolment.house,
      transaction_id: enrolment.transaction_id || '9999',
      start_date: enrolment.start_date,
      expiry_date: enrolment.expiry_date,
      amount_paid: enrolment.amount_paid || "0",
      places_alloted: enrolment.places_alloted
    };
    this.enrolmentService.addEnrolment(d)
      .subscribe(
        house => {
          this.loading = false;
          this.enrolmentService.updateStatus = house['message'];
          setTimeout(() => this.enrolmentService.updateStatus = '', 5000);
          this.router.navigate(['/admin/enrolments']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.loading = false;
          //console.error(<any>error);
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }
  onSearchChange(query: string) {
    let filtered = [];
    this.users.forEach((v, i) => {
      let add = false;
      if (query) {
        query = query.toLowerCase();
        if (v.name) {
          if (v.name.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
      } else {
        add = true;
      }
      if (add) {
        filtered.push(v);
      }
    })
    this.filteredUsers = filtered;
  }
  onChangeObj(houseId) {
    //console.log(newObj);
    this.houses.forEach((h) => {
      if (h.id == houseId) {
        this.selectedHouse = h;
      }
    });
  }

  ngOnInit() {
    this.enrolmentService.createEnrolment().subscribe(
      data => {
        this.currencies = data['currency'];
        this.roles = data['roles'];
        this.users = data['users'];
        this.filteredUsers = data['users'];
        this.houses = data['houses'];
      },
      error => console.error(<any>error));
  }

}
