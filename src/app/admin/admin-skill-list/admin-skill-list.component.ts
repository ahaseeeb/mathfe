import { Component, OnInit, Inject } from '@angular/core';
import { Skill } from 'app/models/skill';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component"
import { SkillService } from 'app/services/skill.service';
import { TrackService } from 'app/services/track.service';
import { MatDialog } from '@angular/material';
import { KatexOptions } from 'ng-katex';
import { DomSanitizer } from '@angular/platform-browser';
import katex from 'katex';
declare var $: any;
@Component({
  selector: 'ag-admin-skill-list',
  templateUrl: './admin-skill-list.component.html',
  styleUrls: ['./admin-skill-list.component.css']
})
export class AdminSkillListComponent implements OnInit {

  public beURL = environment.apiURL + '/';
  public allSkill = [];
  public skills: Skill[] = [];
  public loading: boolean = true;
  public modalLoader = false;
  public currentTracks = [];
  // sort block

  public sortedByTitle: boolean = false;
  public sortedByDescription: boolean = false;
  public sortedByAuthor: boolean = false;

  public reversedByTitle: boolean = false;
  public reversedByDescription: boolean = false;
  public reversedByAuthor: boolean = false;

  public copyMessage: string;
  public copyMessageSuccess: boolean;

  ShowColumns = {
    ID: true,
    Skill: true,
    Title: true,
    Description: true,
    Author: true,
    Tracks: true,
    Questions: true,
    Action: true
  }

  constructor(
    private _router: Router,
    private skillService: SkillService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private trackService: TrackService
  ) { }

  ngOnInit() {
    this._updateloading(true);
    this.skillService.getSkills()
      .subscribe(items => {
        items.forEach((v, i) => {
          var videos = [];
          if (!v.links) {
            if (v.lesson_link) {
              videos.push(v.lesson_link)
            }
          } else {
            videos = v.links;
          }
          //if (videos.length == 0) {
          //  // //Default Video
          //  videos.push({
          //    id: -1,
          //    link: "/videos/skills/logo.mp4"
          //  });
          //}
          v.videos = [];
          videos.forEach((url, ii) => {
            v.videos.push({
              play: false,
              link: this.beURL + url.link
            });
          });
        });
        this.allSkill = items.sort(this._sortById);
        this.skills = items.sort(this._sortById);
        this._updateloading(false);
      });
  }
  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.skillService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.skillService.updateStatus;
  }

  public videoUrl(skill): string {
    let url = skill.lesson_link;
    if (url) {
      return this.beURL + url;
    }
    else return this.beURL + "/videos/skills/logo.mp4"
  }

  public copySkill(id: string): void {

    this.skillService.copySkill(id).subscribe(result => {
      if (result["code"] == 201) {
        this.copyMessageSuccess = true;
        this.copyMessage = result["message"];
        let skill = result["skill"];
        let cSkill = this.skills.find(x => x.id == id);
        cSkill.id = skill.id;
        this.skills.push(cSkill);
      }
      else {
        this.copyMessageSuccess = false;
        this.copyMessage = result["message"];
      }
      setTimeout(() => {
        this.copyMessageSuccess = false;
        this.copyMessage = null;
      }, 3000);
    });
  }

  public editSkill(id: number): void {
    this._router.navigate(['/admin/skills/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Skill" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/skills/delete', id]);
        } else {
          //rejected
        }
      });
  }
  // sort block

  public sortBy(str: string): void {
    if (this.skills && this.skills.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.skills.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.skills.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.skills.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.skills.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
        case 'author':
          if (this.sortedByAuthor) {
            this.skills.reverse();
            this._resetSort();
            this.reversedByAuthor = true;
          }
          else {
            this.skills.sort(this._sortByauthor);
            this._resetSort();
            this.sortedByAuthor = true;
          }
          break;
      }
    }
  }


  private _sortById(a: Skill, b: Skill): number {
    if (a.id < b.id) {
      return -1;
    }
    else if (a.id > b.id) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByTitle(a: Skill, b: Skill): number {
    if (a.skill.toLowerCase() < b.skill.toLowerCase()) {
      return -1;
    }
    else if (a.skill.toLowerCase() > b.skill.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Skill, b: Skill): number {
    if (a.description.toLowerCase() < b.description.toLowerCase()) {
      return -1;
    }
    else if (a.description.toLowerCase() > b.description.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByauthor(a, b): number {
    if (a.user.firstname.toLowerCase() < b.user.firstname.toLowerCase()) {
      return -1;
    }
    else if (a.user.firstname.toLowerCase() > b.user.firstname.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _resetSort(): void {
    this.sortedByTitle = false;
    this.sortedByDescription = false;
    this.reversedByTitle = false;
    this.reversedByDescription = false;
    this.reversedByAuthor = false;

  }

  public doSearch(query) {
    let filtered = [];
    this.allSkill.forEach((v, i) => {
      let add = false;
      if (query) {
        query = query.toLowerCase();
        if (v.user.firstname) {
          if (v.user.firstname.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
        if (v.user.lastname) {
          if (v.user.lastname.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
        if (v.description) {
          if (v.description.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
        if (v.skill) {
          if (v.skill.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
      } else {
        add = true;
      }
      if (add) {
        filtered.push(v);
      }
    })
    this.skills = filtered;
  }

  displayKatex(string: string, id?: number, parseHtml?: boolean, elementId?: string) {

    if (!string) return true;
    var searchStrLen = string.length;
    var startIndex = 0, index, indexes = [];

    if (string.indexOf('$$') < 0) return false;
    else if (!parseHtml) return true;

    while ((index = string.indexOf('$$', startIndex)) > -1) {
      indexes.push(index);
      startIndex = index + 2;
    }

    if (indexes.length <= 1 || !parseHtml) return false;

    let html = "";
    startIndex = 0;
    for (var i = 0; i < indexes.length; i++) {
      let katexString = string.substring(indexes[i] + 2, indexes[i + 1]);
      let text = string.substring(startIndex, indexes[i]) + " ";

      html += text + katex.renderToString(katexString, {
        throwOnError: false
      });

      i++;
      startIndex = indexes[i] + 2;

      if (((i + 1) == indexes.length) && (startIndex < searchStrLen)) {
        html += string.substring(startIndex, searchStrLen);
      }
    }

    const katexDiv: any = document.getElementById(elementId);
    if (!katexDiv) return false;

    katexDiv.innerHTML = html;
    katexDiv.style.display = "";
    return true;
  }

  public showTracks(skillId) {
    //getTracksBySkillId
    this.modalLoader = true;
    this.currentTracks = [];
    $('.modal').modal()
    this.trackService.getTracksBySkillId(skillId).subscribe((result) => {
      this.currentTracks = result.tracks
      this.modalLoader = false;;
    })
  }
  public hideTracks() {
    $('.modal').modal('hide')
  }

  public loadQuestions(skill) {
    if (skill.loadingQuestions == undefined) {
      skill.loadingQuestions = true;
      skill.questions = [];
      this.skillService.getQuestios(skill.id).subscribe((d) => {
        skill.questions = d;
        skill.loadingQuestions = false;
        this.allSkill.forEach((s, i) => {
          if (s.id == skill.id) {
            s = skill;
          }
        });
      }, (err) => {
        skill.loadingQuestions = false;
        console.error(err);
      })
    }
  }
}
