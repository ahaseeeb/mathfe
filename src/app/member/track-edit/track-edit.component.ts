import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../models/track';
import { Status } from '../../models/status';
import { Field } from '../../models/field';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'ag-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.css']
})
export class TrackEditComponent implements OnInit {
  state: string;
  message: string;
  fields: Field[];
  levels: Status[];
  statuses: any;
  @Input() track:Track;

  track1 = new Track('id', 'track', 'description', 'user_id', 'image', 'status_id','field_id', 'level_id');
  field : Field;
  status: Status;

  constructor(private trackService:TrackService) { }

  ngOnInit() {
    this.track1 = this.track;
    this.trackService.createTrack().subscribe(
      data => {
        this.fields = data['fields'];
        this.levels = data['levels'];
        this.statuses = data['statuses'];
      },
      error =>  console.error(<any>error)); 
  }

  updateTrack(track) {
    track.field = this.fields.filter((f) => { return f.id == track.field_id })[0];
    track.level = this.levels.filter((f) => { return f.id == track.level_id })[0];
    track.status = this.statuses.filter((f) => { return f.id == track.status_id })[0];
	 
	  this.trackService.updateTrack(track)
	    .subscribe(
	      track  => {
	        this.state = 'success';
	        this.message = track['message'];
	        this.track = track['track'];
	      },
	      error => { 
	        console.error(<any>error);
	        this.state = 'error';
	        this.message = error['message'];
	      }
	    );
	  }

  closeEditModal(){
  	this.message=null;
  	this.state=null;
  }
}