import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SurveyService } from '../../../../services/survey.service';
import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-surveys-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
  ],
  templateUrl: './surveys-form.component.html',
  styleUrl: './surveys-form.component.scss',
})
export class SurveysFormComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  surveyForm: any;

  private _surveyService = inject(SurveyService);
  private _courseService = inject(CourseService);

  errors: any = {};
  surveyId: any = 0;
  courses: any = [];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCourses();

    this.surveyForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      course: ['', [Validators.required]],
      questions: this._formBuilder.array([]),
    });

    this.surveyId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.surveyId) {
      this.getEvaluation(this.surveyId);
    }
  }

  questions() {
    return this.surveyForm.get('questions') as UntypedFormArray;
  }

  answers(question: number) {
    return this.questions().at(question).get('answers') as any;
  }

  getEvaluation(surveyId: number) {
    this._surveyService
      .getData(surveyId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          const { questions } = response;
          this.surveyForm.patchValue(response);

          this.setQuestions(questions);
        },
        error: (err) => {
          console.error('error obteniendo formulario');
        },
      });
  }

  setQuestions(questions: any) {
    const questionFormGroups: any = [];

    if (questions.length > 0) {
      questions.forEach((item: any) => {
        const answers = this.setAnswers(item.answers);

        questionFormGroups.push(
          this._formBuilder.group({
            id: [item.id],
            question: [item.question],
            question_type: [item.question_type],
            answers: this._formBuilder.array(answers),
          })
        );
      });
    }

    questionFormGroups.forEach((questionFormGroup: any) => {
      (this.surveyForm.get('questions') as UntypedFormArray).push(
        questionFormGroup
      );
    });
  }

  setAnswers(answers: any) {
    const questionFormGroups: any = [];

    if (answers.length > 0) {
      answers.forEach((item: any) => {
        questionFormGroups.push(
          this._formBuilder.group({
            id: [item.id],
            answer: [item.answer],
            question: [item.question],
          })
        );
      });
    }

    return questionFormGroups;
  }

  saveEvaluation() {
    if (this.surveyForm.invalid) {
      return;
    }

    const data = this.surveyForm.value;

    let form = this._surveyService.postData(data);
    if (this.surveyId) {
      form = this._surveyService.putData(this.surveyId, data);
    }

    form.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/admin/surveys');
      },
      error: (err) => {
        const { error } = err;

        if (err.status == 400) {
          this.errors = error;
        }
        console.error('error guardando formulario');
      },
    });
  }

  /**
   *
   * question actions
   */
  addQuestionField(): void {
    const questionFormGroup = this._formBuilder.group({
      id: [''],
      question: ['', Validators.required],
      question_type: ['', Validators.required],
      answers: this._formBuilder.array([]),
    });

    (this.surveyForm.get('questions') as UntypedFormArray).push(
      questionFormGroup
    );
  }

  removeQuestionField(index: number): void {
    const questionsFormArray = this.surveyForm.get(
      'questions'
    ) as UntypedFormArray;

    questionsFormArray.removeAt(index);
  }

  /**
   *
   * answer actions
   */
  addAnswerField(question: number): void {
    const answerFormGroup = this._formBuilder.group({
      id: [''],
      answer: ['', Validators.required],
    });

    this.answers(question).push(answerFormGroup);
  }

  removeAnswerField(question: number, answer: number) {
    this.answers(question).removeAt(answer);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getCourses() {
    this._courseService
      .fetchData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.courses = response;
        },
        error: (err) => {
          console.error('error cargando cursos');
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
