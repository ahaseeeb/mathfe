import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { KatexOptions } from 'ng-katex';
import katex from 'katex';
import { HelperService } from '../../services/helper.service';
import { retryWhen } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ag-admin-question-form',
  templateUrl: './admin-question-form.component.html',
  styleUrls: ['./admin-question-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminQuestionFormComponent implements OnInit {

  QuestionForm: FormGroup;
  questionTypeNumberRequirMsg = "Please select at least one answer.";
  questionTypeMCQRequirMsg = "";
  selectedFile: File = null;
  imgURL: string = "images/upload.png";
  img0URL: string = "";
  img1URL: string = "";
  img2URL: string = "";
  img3URL: string = "";
  answerOneImg: File = null;
  answerTwoImg: File = null;
  answerThreeImg: File = null;
  answerFourImg: File = null;
  levels: any;
  difficulties: any;
  statuses: any;
  types: any;
  selectedLevel: any;
  selectedTrack: any;
  selectedSkill: any;
  question: Question = new Question();
  editMode = false;
  formResponse: any;
  apiURL: string = environment.apiURL;
  loading = false;
  equation = "";
  options: KatexOptions = {
    displayMode: true,
    macros: {
      "\\f": "f(#1)"
    }
  };
  displayKatex = [false, false, false, false, false];
  disableAddNumTxtBx = false;
  numericTextBxCount = 0;
  numericTextBoxHTML = '<input min="0" type="number" class="lineinput" placeholder="?">';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Question',
    translate: 'no',
  };

  refreshImages(data: any) {
    if (data.question_image) this.imgURL = environment.apiURL + data.question_image;
    this.img0URL = (data.answer0_image) ? this.apiURL + data.answer0_image : this.img0URL;
    this.img1URL = (data.answer1_image) ? this.apiURL + data.answer1_image : this.img1URL;
    this.img2URL = (data.answer2_image) ? this.apiURL + data.answer2_image : this.img2URL;
    this.img3URL = (data.answer3_image) ? this.apiURL + data.answer3_image : this.img3URL;
  }

  addNumericTextBox(event: any) {
    event.preventDefault();
    this.question.question += this.numericTextBoxHTML;
    this.refreshNumericTextBoxCount();
  }

  questionChange(event) {
    this.refreshNumericTextBoxCount();

    this.parseKatex(this.question.question, 'katex');
  }

  parseKatex(string: string, htmlElement: string) {

    const katexDiv: any = document.getElementById(htmlElement);
    if (!katexDiv) return;

    var searchStrLen = string.length;
    var startIndex = 0, index, indexes = [];
    while ((index = string.indexOf('$$', startIndex)) > -1) {
      indexes.push(index);
      startIndex = index + 2;
    }

    if (indexes.length <= 1) {
      katexDiv.style.display = "none";
      return;
    }

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

    katexDiv.innerHTML = html;
    katexDiv.style.display = "";
  }

  refreshNumericTextBoxCount() {
    const searchHTML = '<input min="0" type="number"';
    if (this.question.question.indexOf(searchHTML) < 0) {

      for (var i = 0; i < 4; i++) {
        this.QuestionForm.controls['answer' + i.toString()].enable();
        this.QuestionForm.controls['answer' + i.toString() + '_image'].enable();
      }

      return;
    }
    var startIndex = 0, index, indexes = [];
    while ((index = this.question.question.indexOf(searchHTML, startIndex)) > -1) {
      indexes.push(index);
      startIndex = index + searchHTML.length;
    }

    this.numericTextBxCount = indexes.length;
    if (this.numericTextBxCount >= 4) this.disableAddNumTxtBx = true;
    else this.disableAddNumTxtBx = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id != undefined) {
        this.loading = true;
        this.editMode = true;
        this.questionService.getQuestion(id)
          .subscribe((data) => {
            if (data.answer0 == "null" || data.answer0 == null) {
              data.answer0 = "";
            }
            if (data.answer1 == "null" || data.answer1 == null) {
              data.answer1 = "";
            }
            if (data.answer2 == "null" || data.answer2 == null) {
              data.answer2 = "";
            }
            if (data.answer3 == "null" || data.answer3 == null) {
              data.answer3 = "";
            }
            this.loading = false;
            this.question = data;
            this.refreshNumericTextBoxCount();
            this.refreshImages(data);
          }, error => {

          });
      }
    });

    this.QuestionForm = this.formBuilder.group({

      answer0: [''],
      answer0_image: [''],
      answer1: [''],
      answer1_image: [''],
      answer2: [''],
      answer2_image: [''],
      answer3: [''],
      answer3_image: [''],
      correct_answer: [''],
      difficulty_id: ['', Validators.required],
      source:[''],
      question: ['', Validators.required],
      question_image: [''],
      skill_id: ['', Validators.required],
      status_id: ['', Validators.required],
      type_id: ['', Validators.required]
    });
  }

  constructor(private http: HttpClient,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private helperService: HelperService) {

    questionService.getQuestionOptions().subscribe((data) => {

      this.difficulties = data.difficulties;
      this.levels = data.skills;
      console.log("levels check");
      console.log(this.levels);

      this.statuses = data.statuses;
      this.types = data.type;


      if (this.editMode) {
        this.selectedLevel = this.levels.find((level) =>
          level.tracks.find((track) =>
            track.skills.find((skill) =>
              skill.id == this.question.skill_id))
        );

        if (this.selectedLevel) {
          this.selectedTrack = this.selectedLevel.tracks.find((track) =>
            track.skills.find((skill) =>
              skill.id == this.question.skill_id));
        }

        if (this.selectedTrack) {
          this.selectedTrack.skills.find((skill) =>
            skill.id == this.question.skill_id);
        }
      }
    });
  }

  diagnostic_number(length: number): Array<any> {
    if (length >= 0) {
      return new Array(length);
    }
  }

  sourceChange(){

  }

  levelChange(e: any) {
    this.selectedTrack = null;
    this.selectedSkill = null;
  }

  onFileSelected(files: FileList) {
    this.selectedFile = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  answerOneImageSelected(files: FileList) {
    this.answerOneImg = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img0URL = event.target.result;
    }
    reader.readAsDataURL(this.answerOneImg);
  }

  answerTwoImageSelected(files: FileList) {
    this.answerTwoImg = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img1URL = event.target.result;
    }
    reader.readAsDataURL(this.answerTwoImg);
  }

  answerThreeImageSelected(files: FileList) {
    this.answerThreeImg = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img2URL = event.target.result;
    }
    reader.readAsDataURL(this.answerThreeImg);
  }

  answerFourImageSelected(files: FileList) {
    this.answerFourImg = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.img3URL = event.target.result;
    }
    reader.readAsDataURL(this.answerFourImg);
  }

  submitForm() {
    this.loading = true;
    if (!this.editMode) {
      this.createQuestion();
    } else {
      this.updateQuestion();
    }
  }

  createQuestion() {
    debugger;
    //const fileName = this.selectedFile.name.substring(0, this.selectedFile.name.indexOf('.'));
    const imageURL = '/images/questions/imp1_question_image/';
    const questionValue = (this.question.question.indexOf('&lt;') >= 0) ?
      this.question.question.replace(/&lt;/g, '<').replace(/&gt;/g, '>') :
      this.question.question;

    const form = {
      answer0: this.question.answer0,
      answer0_image: (this.answerOneImg) ? this.answerOneImg : '',
      answer1: this.question.answer1,
      answer1_image: (this.answerTwoImg) ? this.answerTwoImg : '',
      answer2: this.question.answer2,
      answer2_image: (this.answerThreeImg) ? this.answerThreeImg : '',
      answer3: this.question.answer3,
      answer3_image: (this.answerFourImg) ? this.answerFourImg : '',
      correct_answer: this.question.correct_answer,
      difficulty_id: this.question.difficulty_id,
      source: this.question.source,
      question: questionValue,
      question_image: this.selectedFile,
       // skill_id: this.question.skill_id,
      // status_id: this.question.status_id,
      // type_id: this.question.type_id
    };


    this.questionService.addQuestion(form).subscribe(res => {
      this.question = res.question;
      this.refreshImages(res.question);
      this.formResponse = {
        status: 'success',
        message: res["message"]
      };
      console.log(res.question);
      setTimeout(() => {
        this.router.navigate(['/admin/questions']);
      }
        , 2000);
      this.loading = false;
    }, error => {
      this.formResponse = {
        status: 'error',
        message: this.helperService.ParseErrorMsg(error)
      };
      this.loading = false;
    });

    window.scrollTo(0, 0);
  }

  updateQuestion() {
    this.question.question = (this.question.question.indexOf('&lt;') >= 0) ?
      this.question.question.replace(/&lt;/g, '<').replace(/&gt;/g, '>') :
      this.question.question;
    var form = new FormData();
    form.append('_method', 'PATCH');
    if (this.question.type_id == 2) {
      if (this.question.answer0) {
        form.append('answer0', this.question.answer0);
      }
      if (this.question.answer1) {
        form.append('answer1', this.question.answer1);
      }
      if (this.question.answer2) {
        form.append('answer2', this.question.answer2);
      }
      if (this.question.answer3) {
        form.append('answer3', this.question.answer3);
      }
    }else{
      form.append('answer0', this.question.answer0);
      form.append('answer1', this.question.answer1);
      form.append('answer2', this.question.answer2);
      form.append('answer3', this.question.answer3);
    }

    form.append('answer0_image', (this.answerOneImg) ? this.answerOneImg : '');

    form.append('answer1_image', (this.answerTwoImg) ? this.answerTwoImg : '');
    form.append('answer2_image', (this.answerThreeImg) ? this.answerThreeImg : '');
    form.append('answer3_image', (this.answerFourImg) ? this.answerFourImg : '');
    form.append('correct_answer', this.question.correct_answer);
    form.append('difficulty_id', String(this.question.difficulty_id));
    form.append('source', String(this.question.source));
    form.append('question', this.question.question);
    form.append('question_image', this.selectedFile);
    form.append('skill_id', String(this.question.skill_id));
    form.append('status_id', String(this.question.status_id));
    form.append('type_id', String(this.question.type_id));

    this.questionService.updateQuestion(form, this.question.id).subscribe(res => {

      this.question = res.question;
      this.refreshImages(res.question);
      this.formResponse = {
        status: 'success',
        message: res["message"]
      };
      //localStorage.setItem("last_question_edit_id", this.currentPage + "");
      this.loading = false;

      localStorage.setItem("last_question_edit_id", this.question.id + "")

      setTimeout(() => {
        this.router.navigate(['/admin/questions']);
      }
        , 2000);

      setTimeout(() => window.scrollTo(0, 0), 0);

    }, error => {
      this.formResponse = {
        status: 'error',
        message: this.helperService.ParseErrorMsg(error)
      };
      this.loading = false;
    });

    window.scrollTo(0, 0);
  }
  //if mcq then all images and answer are required
  isAllAnsExistIfMCQ() {
    if (this.question.type_id == 1) {
      let isExist = true;
      let noExistCount = 0;
      if (!this.question.answer0 && !this.img0URL) {
        noExistCount++;
      }
      if (!this.question.answer1 && !this.img1URL) {
        noExistCount++;
      }
      if (noExistCount == 1) {
        if (!this.question.answer0 && !this.img0URL) {
          this.questionTypeMCQRequirMsg = "Please enter First answer or select First Answer image.";
        } else {
          this.questionTypeMCQRequirMsg = "Please enter Second answer or select Second Answer image.";
        }
      }
      if (noExistCount == 2) {
        this.questionTypeMCQRequirMsg = "Please enter First & Second Answer or select image.";
      }
      if (noExistCount > 0) {
        isExist = false;
      }
      return isExist;
    }
    return true;
  }

  totalTextBoxInQuestionHtml() {
    const searchHTML = '<input min="0" type="number"';
    let count = 0;
    if (this.question.question.indexOf(searchHTML) != -1) {
      count = this.occurrences(this.question.question, searchHTML);
    }
    return count;
  }
  show2nAns() {
    if (this.question.type_id == 2) {
      let requiredAns = this.totalTextBoxInQuestionHtml();
      if (requiredAns < 2) {
        return false;
      }
    }
    return true;
  }

  show3edAns() {
    if (this.question.type_id === 2) {
      let requiredAns = this.totalTextBoxInQuestionHtml();
      if (requiredAns < 3) {
        return false;
      }
    }
    return true;
  }
  show4thAns() {
    if (this.question.type_id == 2) {
      let requiredAns = this.totalTextBoxInQuestionHtml();
      if (requiredAns < 4) {
        return false;
      }
    }
    return true;
  }
  isOneAnsExistIfNUMBER() {
    if (this.question.type_id == 2) {
      let requiredAns = 1;
      if (this.totalTextBoxInQuestionHtml() != 0) {
        requiredAns = this.totalTextBoxInQuestionHtml();
      }
      let isExist = true;
      let noExistCount = 0;
      if (!this.question.answer0) {
        noExistCount++;
      }
      if (!this.question.answer1) {
        noExistCount++;
      }
      if (!this.question.answer2) {
        noExistCount++;
      }
      if (!this.question.answer3) {
        noExistCount++;
      }
      if (noExistCount > 0) {
        if (requiredAns == 1 && noExistCount > 3) {
          this.questionTypeNumberRequirMsg = "Please select at least one answer.";
          isExist = false;
        } else if (requiredAns == 2 && noExistCount > 2) {
          this.questionTypeNumberRequirMsg = "Please select at least two answer.";
          isExist = false;
        } else if (requiredAns == 3 && noExistCount > 1) {
          this.questionTypeNumberRequirMsg = "Please select at least three answer.";
          isExist = false;
        } else if (requiredAns == 4 && noExistCount > 0) {
          this.questionTypeNumberRequirMsg = "All answers are required.";
          isExist = false;
        }
      }
      return isExist;
    }
    return true;
  }
  occurrences(string, subString) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
      pos = 0,
      step = subString.length;

    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        ++n;
        pos += step;
      } else break;
    }
    return n;
  }
  validForm() {
    return (
      !this.isAllAnsExistIfMCQ() ||
      !this.isOneAnsExistIfNUMBER() ||
      (this.QuestionForm.status !== 'VALID') ||
      (this.question.type_id == 1 && this.question.correct_answer === null) ||
      (this.question.type_id == 2 &&
        (
          isNaN(Number(this.question.answer0)) ||
          isNaN(Number(this.question.answer1)) ||
          isNaN(Number(this.question.answer2)) ||
          isNaN(Number(this.question.answer3))
        )
      )
    );
  }

  isNumeric(value: String) {
    return isNaN(Number(value)) ? false : true;
  }
}
