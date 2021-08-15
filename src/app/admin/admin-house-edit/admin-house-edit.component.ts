import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HouseService } from '../../services/house.service';
import { HelperService } from '../../services/helper.service';
import { House } from 'app/models/house';
@Component({
  selector: 'ag-admin-house-edit',
  templateUrl: './admin-house-edit.component.html',
  styleUrls: ['./admin-house-edit.component.css']
})
export class AdminHouseEditComponent implements OnInit {

  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  selectedFile: File = null;
  imgURL: string = "images/upload.png";
  formData: FormData = new FormData();
  statuses: any;
  courses = [];
  currencies = [];
  loading = true;
  house: any;//= new House('', '', '', '', '', '', '', '', '');

  constructor(
    private activatedRoute: ActivatedRoute,
    private houseService: HouseService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.loading = true;
    this.houseService.getHouse(this.id).subscribe(
      data => {
        this.house = data;
        this.imgURL = this.beURL + this.house.image;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error(<any>error);
      });

    this.houseService.createHouse().subscribe(
      data => {
        this.courses = data['courses'];
        this.currencies = data['currency'];
      },
      error => console.error(<any>error));
  }
  resetUpdateStatus() {
    this.houseService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.houseService.updateStatus;
  }


  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateHouse(house) {
    this.formData.append('_method', 'PATCH');

    if (this.selectedFile)
      this.formData.append('image', this.selectedFile);


    this.formData.append('house', house.house);
    this.formData.append('description', house.description);
    this.formData.append('start_date', house.start_date);
    this.formData.append('end_date', house.end_date);
    this.formData.append('currency', house.currency);
    this.formData.append('course_id', house.course_id);
    this.formData.append('price', house.price);
    this.loading = true;
    this.houseService.updateHouseWithFormData(this.formData, house.id)
      .subscribe(
        house => {
          this.loading = false;
          this.status = 'success';
          this.message = house['message'];
          this.houseService.updateStatus = this.message = house['message'];
          setTimeout(() => this.houseService.updateStatus = '', 2000);
          this.router.navigate(['/admin/houses']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.loading = false;
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }

  onFileSelected(files: FileList) {
    this.selectedFile = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
