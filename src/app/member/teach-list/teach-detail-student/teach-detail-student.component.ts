import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { House } from '../../../models/house';
import { Chart } from 'chart.js';
import { Skill } from '../../../models/skill';

import { TrackService } from '../../../services/track.service';
import { SkillService } from '../../../services/skill.service';
import { HouseService } from '../../../services/house.service';

@Component({
  selector: 'ag-teach-detail-student',
  templateUrl: './teach-detail-student.component.html',
  styleUrls: ['./teach-detail-student.component.css']
})
export class TeachDetailStudentComponent implements OnInit {

  @Output() selectedEvent: EventEmitter<House> = new EventEmitter<House>();
  @Output() selectedVideo: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Input() selectedTeach: any;
  @Input() user: any;
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
  state: string;
  message: string;
  show_track_passed_modal = false;
  selectedTrackResult: any;

  constructor(private trackService: TrackService, private skillService: SkillService, private houseService: HouseService) {

  }

  parseDecimal(v) {
    if (v) {
      if (v.toString().indexOf(".") != -1) {
        return v.toFixed(2);
      } else {
        return v;
      }
    }
    return 0;
  }
  ngOnInit() {
  }
  showTrackPassedModal(track, status) {
    if (status) {
      this.selectedTrackResult = track.tracks_passed;
      this.show_track_passed_modal = true
    } else {
      this.show_track_passed_modal = false;

    }
  }
  updateHouse() {
    this.houseService.updateHouse(this.selectedTeach).subscribe((d: any) => {
      let EnrolledTeachers = JSON.parse(localStorage.getItem('EnrolledTeachers'));
      EnrolledTeachers.forEach((v, i) => {
        if (v.id == this.selectedTeach.id) {
          v.underperform = d.class.underperform;
          v.overperform = d.class.overperform;
        }
      })
      localStorage.setItem('EnrolledTeachers', JSON.stringify(EnrolledTeachers));
      //
      let EnrolledClassess = JSON.parse(localStorage.getItem('EnrolledClassess'));
      EnrolledTeachers.forEach((v, i) => {
        if (v.id == this.selectedTeach.id) {
          v.underperform = d.class.underperform;
          v.overperform = d.class.overperform;
        }
      })
      localStorage.setItem('EnrolledClassess', JSON.stringify(EnrolledClassess));
      this.state = 'success';
      this.message = d['message'];
    }, (error) => {
      console.error(error);
      this.state = 'error';
      this.message = error['message'];
    });
  }
  getRowClass(student) {
    /**
     * Students with maxile < house.underperform * house.end_framework/100 underperform,
     * students with maxile>house.overperform*house.end_framework/100 overperform.
     * 
     */
    if (student) {
      if (parseFloat(student.maxile_level) < ((this.selectedTeach.underperform * this.selectedTeach.end_framework) / 100)) {
        return "row-red"; //red (underperform)
      } else if (parseFloat(student.maxile_level) > ((this.selectedTeach.overperform * this.selectedTeach.end_framework) / 100)) {
        return "row-green"; //green (overperform)
      } else {
        return ""  //
      }
    }
    return "";
  }
  // unSelect(house: House) {
  //   this.selectedEvent.emit(null);
  // }
}