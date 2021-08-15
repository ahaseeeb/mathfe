import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, OnChanges, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { QuestionService } from '../../services/question.service';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { KatexOptions } from 'ng-katex';
import katex from 'katex';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
export interface DialogData { id: string }

@Component({
  selector: 'ag-admin-question-list',
  templateUrl: './admin-question-list.component.html',
  styleUrls: ['./admin-question-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminQuestionListComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) topPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchBy = "1";
  allPages = [];
  gridData: any;
  dataModel;
  displayedColumns: string[] = ['id', 'question', 'answer', 'skill', 'track', 'field', 'level', 'difficulty', 'status', 'source', 'author', 'action'];
  dataSource = new MatTableDataSource<any>();
  beURL = environment.apiURL;
  currentPage = 1;
  selectedQuestion: any;
  loading = true;
  options: KatexOptions = {
    displayMode: true,
    macros: {
      "\\f": "f(#1)"
    }
  };
  searchOptions: any = { skills: [], levels: [] };
  selectedLevel: any;
  selectedSkill: any;
  searchQuestion: any;

  ShowColumns = {
    ID: true,
    Question: true,
    Answer: true,
    Skill: true,
    Track: true,
    Field: true,
    Level: true,
    Difficulty: true,
    Status: true,
    Source: true,
    Author: true,
    Action: true
  }
  config = {
    search: true,
    searchPlaceholder: "Type Page No.",
    limitTo: this.allPages.length,
    height: '250px'
  };
  constructor(private http: HttpClient,
    private questionService: QuestionService,
    public dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef) {
    if (localStorage.getItem("last_question_edit_id") && localStorage.getItem("last_question_edit_page_index")) {
      this.onPaginateChange(parseInt(localStorage.getItem("last_question_edit_page_index")));
    } else {
      localStorage.removeItem('last_question_edit_page_index');
      localStorage.removeItem('last_question_edit_id');
      this.onPaginateChange(1);
    }


    this.questionService.getSearchOptions().subscribe(res => {
      this.searchOptions = res;
    }, error => {
      console.log("error", error);
    });

  }

  ngOnInit() {

  }

  columnClick(colName: string) {
    const colIndex = this.displayedColumns.findIndex(col => col === colName);
    if (colIndex > 0) {
      // column is currently shown in the table, so we remove it
      this.displayedColumns.splice(colIndex, 1);
    } else {
      // column is not in the table, so we add it
      this.displayedColumns.push(colName);
    }
  }



  ngOnChanges() {
    this.cdr.detectChanges();
  }
  doSearch() {

  }
  searchByKeyword() {
    const dom: any = document.getElementById('searchQuestion');
    this.search({ keyword: dom.value });
  }

  searchBySkill(skill_id: any) {
    this.search({ skill: skill_id });
  }

  searchByLevel(level_id: any) {
    this.search({ level: level_id });
  }

  search(searchOption: any) {
    this.loading = true;
    this.questionService.searchQuestions(searchOption).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.questions);
      this.loading = false;
    }, error => {
      console.log("error", error);
      this.loading = false;
    });
  }

  resetSearch() {
    this.selectedLevel = null;
    this.selectedSkill = null;;
    const dom: any = document.getElementById('searchQuestion');
    dom.value = "";
    this.searchBy = "1";
    this.dataSource = new MatTableDataSource<any>(this.gridData.questions);
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

  editQuestion(id) {
    localStorage.setItem("last_question_edit_page_index", this.currentPage + "");
    this.router.navigate(['/admin/questions/edit/' + id]);
  }
  gotToPage() {
    if (this.dataModel) {
      this.onPaginateChange(this.dataModel['id']);
    }
  }

  onPaginateChange(pageIndex) {
    this.dataModel = pageIndex;
    this.loading = true;
    this.currentPage = pageIndex;

    this.questionService.getQuestions(this.currentPage).subscribe((data) => {
      this.gridData = data;
      this.allPages = [];
      for (let i = 1; i <= data.num_pages; i++) {
        let d = {
          id: i,
          description: i
        };
        this.allPages.push(d);
      }
      this.dataSource = new MatTableDataSource<any>(this.gridData.questions);
      this.dataSource.sort = this.sort;

      if (localStorage.getItem("last_question_edit_id") && localStorage.getItem("last_question_edit_page_index")) {
        setTimeout(() => {
          let id = localStorage.getItem("last_question_edit_id");
          var elmnt = document.getElementById("question_" + id);
          elmnt.scrollIntoView({ block: 'end', behavior: 'smooth' });
          localStorage.removeItem('last_question_edit_id');
          localStorage.removeItem('last_question_edit_page_index');
        }, 1000)
      }
      //this.updatePaginator(origin);
      this.loading = false;

    });
  }

  updatePaginator(origin: string) {
    this.topPaginator.length = ((this.currentPage + 2) * this.gridData.questions.length);
    this.topPaginator.pageIndex = this.currentPage;
    const dom: any = document.querySelector('.mat-paginator-range-label');
    if (dom) dom.style.display = 'none';
  }

  confirmDelete(question: any) {
    let dialogRef = this.dialog.open(DialogDeleteQuestion, {
      width: '250px',
      data: { id: question.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onPaginateChange(this.currentPage);
    });
  }
}

// dialog component
@Component({
  template: `<h2 mat-dialog-title>Delete Question</h2>
<mat-dialog-content>Are you sure?
<div style="margin-top: 0.5rem;" *ngIf="deleteResult && deleteResult.status ==='success'" class="alert alert-success" role="alert"> {{ deleteResult.message }} </div>
<div style="margin-top: 0.5rem;" *ngIf="deleteResult && deleteResult.status ==='error'" class="alert alert-danger" role="alert"> {{ deleteResult.message }} </div>
</mat-dialog-content>
<mat-dialog-actions>
  <button id="closeButton" mat-button mat-dialog-close>No</button>
  <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
  <button id="yesButton" mat-button (click)="onYesClick()">Yes</button>
</mat-dialog-actions>`,
  selector: 'dialog-delete-question'
})

export class DialogDeleteQuestion {

  deleteResult: any;

  constructor(
    private helperService: HelperService,
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<DialogDeleteQuestion>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onYesClick(): void {

    this.questionService.deleteQuestion(this.data.id)
      .subscribe(res => {

        this.deleteResult = {
          status: 'success',
          message: res["message"]
        };

        let dom: any = document.querySelector('#closeButton');
        dom.innerHTML = "Close"

        dom = document.querySelector('#yesButton');
        dom.style.display = 'none';

      }, error => {

        this.deleteResult = {
          status: 'error',
          message: this.helperService.ParseErrorMsg(error)
        };
      });
  }
}
