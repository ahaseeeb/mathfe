import { Component, OnInit, Input } from '@angular/core';
import { TrackService} from '../../services/track.service';
import { Router} from '@angular/router';
import { House } from '../../models/house';
import { Field } from '../../models/field';

@Component({
  selector: 'ag-track-create',
  templateUrl: './track-create.component.html',
  styleUrls: ['./track-create.component.css']
})

export class TrackCreateComponent implements OnInit {
	@Input() house:House;
	status: string;
	message: string;
	fields: any;
	levels: any;
	statuses: any;
	my_tracks: any;
	public_tracks: any;

  constructor(private trackService: TrackService, private router:Router) { }

  ngOnInit() {
    this.trackService.createTrack().subscribe(
      data => {
        this.fields = data['fields'];
        this.levels = data['levels'];
        this.statuses = data['statuses'];
        this.my_tracks = data['my_tracks'];
        this.public_tracks = data['public_tracks'];
      },
      error =>  console.error(<any>error)); 
  }

  addTrack(track) {
   this.trackService.addTrack(track)
   .subscribe(
     track  => {
       this.router.navigate(['/']);
       this.status = 'success';
       this.message = track['message'];
       this.my_tracks.push(track['track']);
       this.house['tracks'].push(track['track']);
     },
     error => {
       console.error(<any>error);
       this.status = 'success';
       this.message = error['message'];
     }
   );
  }
}
