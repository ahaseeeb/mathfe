import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnrolmentService } from '../../services/enrolment.service';
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Enrolment } from '../../models/enrolment';
import { EnrolmentEdit } from '../../models/enrolment-edit';

@Component({
  selector: 'ag-admin-enrolment-edit',
  templateUrl: './admin-enrolment-edit.component.html',
  styleUrls: ['./admin-enrolment-edit.component.css']
})
export class AdminEnrolmentEditComponent implements OnInit {
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
  formData: FormData = new FormData();
  id: any;
  params: any;

  enrolment = new EnrolmentEdit('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  constructor(private enrolmentService: EnrolmentService, private activatedRoute: ActivatedRoute,
    private router: Router, private helperService: HelperService) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.loading = true;
    this.enrolmentService.createEnrolment().subscribe(
      data => {
        this.currencies = data['currency'];
        this.roles = data['roles'];
        this.users = data['users'];
        this.filteredUsers = data['users'];
        this.houses = data['houses'];
        this.enrolmentService.getEnrolment(this.id).subscribe(
          data => {
            this.enrolment = data;
            this.users.forEach((u) => {
              if (u.id == this.enrolment.user_id) {
                this.enrolment.user_name = u.name;
              }
            });
            this.onChangeObj(this.enrolment.house_id);
            this.loading = false;
          },
          error => {
            this.loading = false;
            console.error(<any>error);
          });
      },
      error => console.error(<any>error));
  }
  resetUpdateStatus() {
    this.enrolmentService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.enrolmentService.updateStatus;
  }


  ngOnDestroy() {
    this.params.unsubscribe();
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

  updateEnrolment(enrolment) {
    this.loading = true;
    this.roles.forEach((r) => {
      if (r.id == enrolment.role_id) {
        enrolment.role = r.role;
      }
    });
    var d = {
      id: this.id,
      user: enrolment.user_name,
      role: enrolment.role,
      currency_code: enrolment.currency_code,
      house_id: enrolment.house_id,
      transaction_id: enrolment.transaction_id || '9999',
      start_date: enrolment.start_date,
      expiry_date: enrolment.expiry_date,
      amount_paid: enrolment.amount_paid || "0",
      places_alloted: enrolment.places_alloted
    };
    this.enrolmentService.updateEnrolment(d)
      .subscribe(
        enrolment => {
          this.loading = false;
          this.status = 'success';
          this.message = enrolment['message'];
          this.enrolmentService.updateStatus = this.message = enrolment['message'];
          setTimeout(() => this.enrolmentService.updateStatus = '', 2000);
          this.router.navigate(['/admin/enrolments']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.loading = false;
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }

}
