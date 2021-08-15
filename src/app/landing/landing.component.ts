import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service'; 
declare var $ :any;

@Component({
  selector: 'ag-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  courses: any;
  selectedCourse: Course;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
	/* =================================
	===  RESPONSIVE VIDEO           ====
	=================================== */

	$(".video-container").fitVids();

	/* =================================
	===  OWL CROUSEL               ====
	=================================== */
	$(document).ready(function () {

	    $("#feedbacks").owlCarousel({ 

	        navigation: false, // Show next and prev buttons
	        slideSpeed: 800,
	        paginationSpeed: 400,
	        autoPlay: 5000,
	        singleItem: true
	    });

	    var owl = $("#screenshots");

	    owl.owlCarousel({
	        items: 4, //10 items above 1000px browser width
	        itemsDesktop: [1000, 4], //5 items between 1000px and 901px
	        itemsDesktopSmall: [900, 2], // betweem 900px and 601px
	        itemsTablet: [600, 1], //2 items between 600 and 0
	        itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	    });


	});

	/* =================================
	===  Nivo Lightbox              ====
	=================================== */
	$(document).ready(function () {
	    $('#screenshots a').nivoLightbox({
	        effect: 'fadeScale',
	    });
	});
  }

   selectCourse(course: Course) { 
	 this.selectedCourse = course;
	 //scroll to the course details 
	 let element: HTMLElement = document.getElementById("course-detail") as HTMLElement;
	 element.scrollIntoView(true);
	 window.scrollBy(0, -70);

   }

   public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}