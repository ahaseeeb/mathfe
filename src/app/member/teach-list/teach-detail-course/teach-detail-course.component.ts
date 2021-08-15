import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { House } from '../../../models/house';
import { Chart } from 'chart.js';
import { Skill } from '../../../models/skill';
declare var jQuery: any;
declare var $: any;
import { TrackService } from '../../../services/track.service';
import { SkillService } from '../../../services/skill.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'ag-teach-detail-course',
  templateUrl: './teach-detail-course.component.html',
  styleUrls: ['./teach-detail-course.component.css']
})
export class TeachDetailCourseComponent implements OnInit {

  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  @Output() selectedVideo: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Input() selectedTeach: any;
  @Input() user: any;
  _beURL = environment.apiURL + '/';
  chartdata: any;
  addTrackOn: boolean = false;
  editTrackOn: boolean = false;
  deleteTrackOn: boolean = false;
  selectedTrackEdit: any;
  delete_Track: any;
  addSkillOn: boolean = false;
  editSkillOn: boolean = false;
  deleteSkillOn: boolean = false;
  selectedSkillEdit: any;
  delete_skill: any;
  delete_skill_track: any;
  fields: any;
  levels: any;
  statuses: any;
  selectedStudent: any;
  constructor(private trackService: TrackService, private skillService: SkillService) {

  }

  ngOnInit() {
  }
  // unSelect(house: House) {
  //   this.selectedEvent.emit(null);
  // }

  onVideo(skill: Skill) {
    this.selectedVideo.emit(skill);
  }

  createTrack() {
    this.addTrackOn = this.addTrackOn ? false : true;
  }

  editSelectedTrack(track) {
    this.editTrackOn = true;
    this.selectedTrackEdit = track;
  }

  deleteSelectedTrack(track) {
    this.delete_Track = track;
    this.deleteTrackOn = true;
  }
  createSkill() {
    this.addSkillOn = this.addSkillOn ? false : true;
  }

  editSelectedSkill(skill) {
    this.editSkillOn = true;
    this.selectedSkillEdit = skill;
  }

  deleteSelectedSkill(skill, track) {
    this.delete_skill_track = track;
    this.delete_skill = skill;
    this.deleteSkillOn = true;
  }
  getTargetClass(skill, house) {
    if (skill) {
      if (skill.user) {
        if (parseFloat(skill.user.maxile_level) < ((house.underperform * house.end_framework) / 100)) {
          return "btn-delete"; //red (failed)
        } else if (parseFloat(skill.user.maxile_level) > ((house.overperform * house.end_framework) / 100)) {
          return "btn-success"; //green icon (exceed target)
        } else {
          return "btn-warning"  //yellow (on target)
        }
      }
    }
    /**
     * if user.maxile_level < house.underperform/100house.end_framework
    
    , then underperform, if user.maxile_level > house.overperform/100 house.end_framework then overperform. Otherwise, on target.
     * 
     */
  }

  toggelSkillCheck(skill, trackId) {
    skill.checkProcess = true;
    if (!Object.create)
      Object.create = function (proto) {
        function F() { }
        F.prototype = proto;
        return new F;
      }
    let skillModel = Object.create(skill);
    if (skillModel.check == 1) {
      skillModel.check = "FALSE";
    } else {
      skillModel.check = "TRUE"
    }
    this.skillService.updateSkill(skillModel).subscribe((s: any) => {
      if (s.skill.check == "TRUE") {
        skill.check = 1;
      } else {
        skill.check = 0;
      }
      skill.checkProcess = false;
      let houses = JSON.parse(localStorage.getItem('EnrolledTeachers'));
      houses.forEach((h, i) => {
        if (h.id == this.selectedTeach.id) {
          h = this.selectedTeach;
        }
      })
      localStorage.setItem('EnrolledTeachers', JSON.stringify(houses));

      let EnrolledTeachers = JSON.parse(localStorage.getItem('EnrolledTeachers'));
      EnrolledTeachers.forEach((v, i) => {
        if (v.id == this.selectedTeach.id) {
          v.tracks.forEach((t, ti) => {
            if (t.id == trackId) {
              t.skills.forEach((s, si) => {
                if (s.id == skill.id) {
                  s.check = skill.check;
                }
              });
            }
          })
        }
      })
      localStorage.setItem('EnrolledTeachers', JSON.stringify(EnrolledTeachers));

    }, (error) => {
      console.error(error);
      skill.checkProcess = false;
    });
  }

  setVideoUrl(url) {
    localStorage.setItem('VideoUrl', this._beURL + url);
  }

}
