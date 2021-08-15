import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillService } from '../../services/skill.service';
import { HelperService } from '../../services/helper.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'ag-admin-skill-create',
  templateUrl: './admin-skill-create.component.html',
  styleUrls: ['./admin-skill-create.component.css']
})
export class AdminSkillCreateComponent implements OnInit {
  public status: string;
  public message: string;
  public selectedFile = []; 
  lesson_preview_link = [];
  showMaxLimitMsg = false;
  statuses: any;
  my_tracks = [];
  public_tracks = [];
  loading: boolean = false;

  constructor(
    private skillService: SkillService,
    private router: Router, private helperService: HelperService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.skillService.createSkill().subscribe(
      data => {
        this.statuses = data['statuses'];
        this.my_tracks = data['my_tracks'] || [];
        this.public_tracks = data['public_tracks'] || [];
      },
      error => console.error(<any>error));
  }
  public createSkill(skill): void {
    this.loading = true;
    const formData: FormData = new FormData();

    if (skill.video) {
      this.selectedFile.forEach((file, i) => {
        formData.append('links[' + i + ']', file);
      }) 
    }
    formData.append('skill', skill.skill);
    formData.append('description', skill.description);
    formData.append('track_ids', JSON.stringify(skill.track_id));
    //formData.append('track_ids', (skill.track_id));
    formData.append('status_id', skill.status_id);
    this.skillService.addSkill(formData)
      .subscribe(
        skill => {
          this.loading = true;
          this.skillService.updateStatus = skill['message'];
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
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
