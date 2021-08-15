import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../models/track';
import { House } from '../../models/house';
import { HouseTrackService } from '../../services/house-track.service';

@Component({
  selector: 'ag-track-delete',
  templateUrl: './track-delete.component.html',
  styleUrls: ['./track-delete.component.css']
})
export class TrackDeleteComponent implements OnInit {
  @Input() house:House;
  @Input() track:Track;
  state: string;
  message: string;

  constructor(private houseTrackService:HouseTrackService) { }

  ngOnInit() {	
  }

  deleteTrack(deleteTrack) {
  	this.houseTrackService.deleteTrack(this.house.id,this.track.id).subscribe(
      track  => {
        this.state = 'success';
        this.message = track['message'];
		this.house['tracks'] = track['tracks'];
      },
      error => { 
        console.error(<any>error);
        this.state = 'error';
        this.message = error['message'];
      }
    );
  }

  closeDeleteModal(){
  	this.message=null;
  	this.state=null;
  }

}
