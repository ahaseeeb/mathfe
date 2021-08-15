import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Course } from '../../models/course';
import { House } from '../../models/house';
import { Skill } from '../../models/skill';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ModalService } from '../../services/modal.service';
import { of } from 'rxjs';
import { PayPalConfig, PayPalIntegrationType } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'ag-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @Input() activeTab: any;
  selectedHouse: House;

  dashboard: any;
  houses: any;
  courses: any;
  selectedCourse: Course;
  selectedTeach: House;
  selectedVideo: Skill;
  videolink: any;
  user: Observable<any>;
  modalRadio = "";
  isModal: boolean;
  email_value = [];
  email_errors = [];
  place_value;
  amount_due;
  numbers;
  price_value;
  currency_value;
  isFormInvaild = true;
  isEnrollmentValidationError = false;
  allEmailsRequired = false;
  enrolSuccessMessage: any;
  enrolSuccessMessageStatus = false;
  placed_allocated: any;
  mastercode: any;
  public payPalConfig?: PayPalConfig;

  constructor(private dashboardService: DashboardService, private modalService: ModalService, public http: HttpClient) { }

  houseObj = JSON.parse(localStorage.getItem('house'));
  description = this.houseObj ? this.houseObj.description : '';
  emails = [];
  ngOnInit() {
    if (localStorage.getItem('house')) {
      this.isModal = true;
      this.isFormInvaild = true;
      this.price_value = this.houseObj.price;
      this.currency_value = this.houseObj.currency;
    } else {
      this.isModal = false;
    }
    this.dashboardService.getUser().subscribe(
      data => {
        this.user = data;
        // if (this.user["is_admin"] == 0) { 
        // }
      },
      error => console.error(<any>error));
    if (this.price_value != 0) {
      this.initConfig();
    }
  }

  onChange(event: any) {
    this.place_value = event.target.value;
    if (this.place_value < this.email_value.length) {
      this.email_value = this.email_value.slice(0, this.place_value);
      this.validatePaypalButton();
    }
    if (this.place_value > 10) {
      alert("Value can be not more than 10");
    } else {
      this.amount_due = this.price_value * this.place_value;
      this.numbers = Array(Number(this.place_value)).fill(0).map((x, i) => i);
    }
  }
  getInVaildFormTitle() {
    if (!this.modalRadio) {
      return "Please select either student or parent!!"
    } else {
      if (this.isFormInvaild) {
        return "Please complete above form or fix above error before proceed!!";
      }
    }
    return "";
  }

  emailChange(index, event: any) {
    this.email_value[index] = event.target.value;
  }

  openModal(id: string) {
    // this.modalService.open(id);
  }

  closeModal(id: string) {
    this.isModal = false;
    localStorage.removeItem('house');
    // this.modalService.close(id);
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.selectedTeach = null;
    this.selectedHouse = null;
  }

  selectHouse(house: House) {
    debugger;
    this.selectedHouse = house;
    this.selectedTeach = null;
    this.selectedCourse = null;
  }

  selectTeach(house: House) {
    this.selectedTeach = house;
    this.selectedCourse = null;
    this.selectedHouse = null;
  }

  selectSkill(skill: Skill) {
    this.selectedVideo = skill;
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  public validatePaypalButton() {

    setTimeout(() => {

      this.email_errors = [];
      const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.modalRadio == 'parent') {
        for (let index in this.email_value) {
          if (!validEmailRegEx.test(this.email_value[index])) {
            this.email_errors[index] = true;
          }
        }
      }

      var selectedValue = this.modalRadio;
      this.allEmailsRequired = false;
      this.isFormInvaild = true;
      this.amount_due = '';
      if (selectedValue == "parent") {
        if (!this.place_value || this.place_value == "0") {
          this.isFormInvaild = true;
        } else {
          if (this.email_value.length != this.place_value) {
            this.allEmailsRequired = true;
          }
          this.amount_due = this.price_value * this.place_value;
          if (this.email_errors.length == 0 && !this.allEmailsRequired) {
            this.isFormInvaild = false;
          }
        }
      } else if (selectedValue == "student") {
        this.isFormInvaild = false;
        this.amount_due = this.price_value;
      }
    }, 100)
  }

  public enrolZeroCoast() {
    this.saveToEnrolments(9999);
  }

  public initConfig(): void {
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      environment.payPal.payPalEnvironment,
      {
        commit: true,
        client: {
          production: environment.payPal.productionKey,
          sandbox: environment.payPal.sandboxKey
        },
        button: {
          label: 'paypal',
          layout: 'vertical'
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          this.saveToEnrolments(data.paymentID);
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log('OnError');
        },
        onClick: () => {

        },
        // validate: (actions) => { 
        // },
        experience: {
          noShipping: true,
          brandName: 'PayPal'
        },
        transactions: [
          {
            amount: {
              total: this.price_value,
              currency: this.currency_value,
            },
            // custom: 'Custom value',
            item_list: {
              //   items: [
              //     {
              //       name: 'hat',
              //       description: 'Brown hat.',
              //       quantity: 5,
              //       price: 3,
              //       tax: 0.01,
              //       sku: '1',
              //       currency: 'USD'
              //     },
              //     {
              //       name: 'handbag',
              //       description: 'Black handbag.',
              //       quantity: 1,
              //       price: 15,
              //       tax: 0.02,
              //       sku: 'product34',
              //       currency: 'USD'
              //     }],
              shipping_address: {
                recipient_name: 'Brian Robinson',
                line1: '4th Floor',
                line2: 'Unit #34',
                city: 'San Jose',
                country_code: 'US',
                postal_code: '95131',
                phone: '011862212345678',
                state: 'CA'
              },
            },
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );
  }

  saveToEnrolments(transaction_id) {

    var httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('access_token')
        }
      )
    };
    var param = {
      role: this.modalRadio,
      user_id: this.houseObj.user_id,
      transaction_id: transaction_id,
      places_alloted: this.modalRadio == "parent" ? this.place_value : 1,
      amount_paid: this.price_value,
      currency_code: this.currency_value,
      house_id: this.houseObj.id
    };
    for (let index in this.email_value) {
      param['student_email' + index] = this.email_value[index];
    }

    this.http.post(
      environment.payPal.postEnrollmentUrl,
      param,
      httpOptions
    ).subscribe(data => {
      console.log("response", data);
      this.enrolSuccessMessage = data['message'];
      this.enrolSuccessMessageStatus = true;
      //this.isModal = false;
      this.placed_allocated = data['places_alloted'];;
      this.mastercode = data['code'];
      localStorage.removeItem('house');
    }, error => {
      console.log("Rrror", error);
    });
  }
}
