import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'ag-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() user: User;
  status: string;
  message: string;
  id: any;
  params: any;
  @Output() editingmode = new EventEmitter<boolean>();

  constructor(private userService: UserService, private authService: AuthService) { }
  fileToUplaod: File = null;
  ngOnInit() {
    this.params = this.user['id'];
  }

  ngOnDestroy() {
    // this.params.unsubscribe();
  }
  handelFileInput(file: FileList) {
    this.fileToUplaod = file.item(0);
  }
  updateUser(user) {

    const fData: FormData = new FormData();
    fData.append('_method', 'PUT');
    for (let key in user) {
      if (key != "image")
        fData.append(key, user[key]);
    }
    if (this.fileToUplaod != null) {
      fData.append("image", this.fileToUplaod);
    } else {
      fData.append("image", user.image);
    }
    this.userService.updateUser(fData, user.id)
      .subscribe(
        (user: any) => {
          this.user = user.user;
          localStorage.setItem('profile_image', (user.image || ''));
          this.authService.triggerUpdateProfileImageObservable();
          this.status = 'success';
          this.message = user['message'];
          setTimeout(() => {    //<<<---    using ()=> syntax
            this.editingmode.emit(false);
          }, 3000);
        },
        error => {
          console.error(<any>error);
          this.status = 'error';
          this.message = error['message'] || 'Not allowed';
        }
      );
  }
}
