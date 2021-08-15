import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HelperService } from '../../services/helper.service';
import { SkillService } from '../../services/skill.service';
import { TrackService } from '../../services/track.service';
declare var $: any;
@Component({
  selector: 'ag-admin-skill-edit',
  templateUrl: './admin-skill-edit.component.html',
  styleUrls: ['./admin-skill-edit.component.css']
})
export class AdminSkillEditComponent implements OnInit, OnDestroy {
  beURL = environment.apiURL + '/';
  showMaxLimitMsg = false;
  status: string;
  message: string;
  id: any;
  params: any;
  selectedFile = [];
  lesson_link: string = "";
  lesson_preview_link = [];
  loading = true;
  formData: FormData = new FormData();
  statuses: any;
  my_tracks = [];
  selected_track_ids = [];
  public_tracks = [];
  skill: any = {}//= new Skill('id', 'skill', 'description', 'user_id', 'image', 'lesson_link', 'status_id');

  constructor(
    private activatedRoute: ActivatedRoute,
    private skillService: SkillService,
    private router: Router,
    private helperService: HelperService,
    private sanitizer: DomSanitizer,
    private trackService: TrackService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.skillService.getSkill(this.id).subscribe(
      data => {
        var videos = [];
        if (!data.links) {
          if (data.lesson_link) {
            videos.push(data.lesson_link)
          }
        } else {
          videos = data.links;
        }
        //if (videos.length == 0) {
        //  // //Default Video
        //  videos.push({
        //    id: -1,
        //    link: "/videos/skills/logo.mp4"
        //  });
        //}
        data.videos = [];
        videos.forEach((url, ii) => {
          data.videos.push({
            play: false,
            link: this.beURL + url.link,
            id: url.id,
            dbLink: url.link
          });
        });
        this.skill = data;
        this.trackService.getTracksBySkillId(data.id).subscribe((result) => {
          this.selected_track_ids = [];
          result.tracks.forEach((t, i) => {
            this.selected_track_ids.push(t.id);
          });
          this.loading = false;
        })
      },
      error => {
        this.loading = false;
        console.error(<any>error)
      });

    this.skillService.createSkill().subscribe(
      data => {
        this.statuses = data['statuses'];
        this.my_tracks = data['my_tracks'] || [];
        this.public_tracks = data['public_tracks'] || [];
      },
      error => console.error(<any>error));

  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnDestroy() {
    this.params.unsubscribe();
  }
  updateSkill(skill) {
    this.formData.append('_method', 'PUT');
    if (this.selectedFile) {
      this.selectedFile.forEach((file, i) => {
        this.formData.append('links[' + i + ']', file);
      })

    }
    if (skill.videos) {
      let index = 0;
      skill.videos.forEach((v, i) => {
        if (v.isDelete == true) {
          if (v.id > 0) {
            this.formData.append('remove_links[' + index + ']', v.id);
            index++;
          }
        }
      });
    }
    this.formData.append('description', skill.description);
    this.formData.append('skill', skill.skill);
    this.formData.append('status_id', skill.status_id);
    // this.formData.append('track_id', skill.track_id);
    this.formData.append('track_ids', JSON.stringify(this.selected_track_ids));
    this.loading = true;
    this.skillService.updateSkillWithFormData(this.formData, skill.id)
      .subscribe(
        skill => {
          this.loading = false;
          this.status = 'success';
          this.message = skill['message'];
          this.skillService.updateStatus = this.message = skill['message'];
          setTimeout(() => this.skillService.updateStatus = '', 2000);
          this.router.navigate(['/admin/skills']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.loading = false;
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }

  public onFileSelected(files: FileList): void {
    this.lesson_preview_link = [];
    this.selectedFile = [];
    for (let i = 0; i < files.length; i++) {
      this.selectedFile.push(files.item(i));
      this.showMaxLimitMsg = false;
      if (this.selectedFile[i].size > 100000000) {
        files = null;
        $("#video").val('')
        this.showMaxLimitMsg = true;
        return;
      }
      let reader = new FileReader();
      reader.onload = (event: any) => {
        let lesson_link = event.target.result;
        this.lesson_preview_link.push(this.sanitize(lesson_link));
      }
      reader.readAsDataURL(this.selectedFile[i]);
    }
  }

}
