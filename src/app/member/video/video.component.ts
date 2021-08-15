import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'ag-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {
  params: any;
  id: any;
  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        this.id = localStorage.getItem('VideoUrl');
      }
    });
  }

  ngOnDestroy() {
    this.params.unsubscribe();    
    $('video').first().attr('src', '');
  }
}
