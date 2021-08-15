import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { House } from '../../models/house';
import { Skill } from '../../models/skill';
import { environment } from 'environments/environment';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'ag-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

  @Input() selectedHouse: any;
  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  @Output() selectedVideo: EventEmitter<Skill> = new EventEmitter<Skill>();
  rowgreen = "row-green";
  rowyellow = "row-yellow";
  _beURL = environment.apiURL + '/';
  constructor() {

  }
  getBgColor(track) {
    /**If all the skills inside is green, then the track is green.
If all the skills inside is grey, then the track is grey.
Otherwise, the track is yellow. */
    //default grey    
    let trackPassedBgColor = "bar-grey";
    if (track) {
      var green = 0;
      var yellow = 0;
      var grey = 0;
      var totalSkill = 0;
      if (track.checked_skills) {
        totalSkill = track.checked_skills.length;
        track.checked_skills.forEach((skill, i) => {
          if (this.getSkillClass(skill, track) == this.rowgreen) {
            green++;
          } else if (this.getSkillClass(skill, track) == this.rowyellow) {
            yellow++;
          } else {
            grey++;
          }
        })
      }
      if (totalSkill > 0) {
        //If all the skills inside is green, then the track is green.
        if (green == totalSkill) {
          trackPassedBgColor = "bar-green";//
        }
        //If all the skills inside is grey, then the track is grey.
        else if (grey == totalSkill) {
          trackPassedBgColor = "bar-grey";//
        }
        //Otherwise, the track is yellow
        else {
          trackPassedBgColor = "bar-yellow";//
        }
      }
    }
    return trackPassedBgColor;
  }
  ngOnInit() {

  }

  // unSelect(house: House) {
  // 	this.selectedEvent.emit(null);
  // }

  onVideo(skill: Skill) {
    this.selectedVideo.emit(skill);
  }

  getSkillClass(skill, track) {


    if (skill) {
      if (skill.skill_maxile) {
        if (skill.skill_maxile.skill_maxile) {
          if (skill.skill_maxile.skill_maxile >= track.level_id * 100) {
            return this.rowgreen;
          } else if (skill.skill_maxile.skill_maxile < track.level_id * 100 && skill.skill_maxile.noOfTries > 0) {
            return this.rowyellow;
          }
        }
      }
    }
    return "";
  }
  culculateTrackPassPercentageValue(tracks_passed, total_tracks) {
    return tracks_passed / total_tracks * 100;
  }
  setVideoUrl(url) {
    localStorage.setItem('VideoUrl', this._beURL + url);
  }
}
