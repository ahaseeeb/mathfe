import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'ag-admin-enrollment-user-detail-modal',
  templateUrl: './admin-enrollment-user-detail-modal.component.html',
  styleUrls: ['./admin-enrollment-user-detail-modal.component.css']
})
export class AdminEnrollmentUserDetailModalComponent implements OnInit {
  user = new User('', '', '', '', '', '', 0, '', '', '', '', '', '');
  loading = true;
  constructor(private userService: UserService, public dialogRef: MatDialogRef<AdminEnrollmentUserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.loading = true;
    this.userService.getUser(this.data.userId).subscribe(d => {
      this.user = d;
      this.loading = false;
    })
  }

  ngOnInit() {
  }

}
