import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from "@angular/router";
declare var $: any;


@Component({
  selector: 'ag-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) {

    this.authService.profileImage().subscribe(p => {
      if (p) {
        this.profilePic = localStorage.getItem('profile_image') ? localStorage.getItem('profile_image') : "/assets/images/user.png";
      }
    })

  }


  isHomeActive = false;
  profilePic = "/assets/images/no_user.png";
  handleImageLoadError = (event) => {
    event.target.src = "/assets/images/no_user.png";
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.triggerUpdateProfileImageObservable();
    }
    this.router.events.subscribe((r: any) => {
      if (r.url == "/" || r.url == "/member") {
        this.isHomeActive = true;
      } else {
        this.isHomeActive = false;
      }
    });

    // $(document).ready(function () {
    //   mainNav();
    // });

    // $(window).scroll(function () {
    //   mainNav();
    // });

    $(document).ready(function () {
      $('.main-navigation').onePageNav({
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        filter: ':not(.external)',
        changeHash: false
      });

    })

    // function mainNav() {
    //   if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
    //     var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    //     if (top > 40) $('.sticky-navigation').stop().animate({ "top": '0' });

    //     else $('.sticky-navigation').stop().animate({ "top": '-120' });
    //   }
    //   if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
    //     var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    //     if (top > 40) $('.sticky-navigation').stop().animate({ "top": '0' });

    //     else $('.sticky-navigation').stop().animate({ "top": '-60' });
    //   }
    // }

  }

  public login() {
    this.authService.login(false);
  }

  public logout() {
    this.authService.logout();
    localStorage.clear();
  }
  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public collapseMenuOnMobile() {
    if (matchMedia('(max-width: 480px)').matches) {
      $(".navbar-toggle").click();
    }
  }
}
