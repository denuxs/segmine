import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { SurveyService } from '../../../../services/survey.service';

@Component({
  selector: 'app-survey-preview',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './survey-preview.component.html',
  styleUrl: './survey-preview.component.scss',
})
export class SurveyPreviewComponent implements OnInit {
  dynamicForm: any;

  private _surveyService = inject(SurveyService);

  survey: any = null;
  surveyId: any = 0;

  formStructure = [
    {
      type: 'radio',
      label: 'question 1',
      name: 'question1',
      value: 'f',
      options: [
        { label: 'Male2', value: 'm' },
        { label: 'Female2', value: 'f' },
      ],
    },
    {
      type: 'radio',
      label: 'question 2',
      name: 'question2',
      value: 'm',
      options: [
        { label: 'Male', value: 'm' },
        { label: 'Female', value: 'f' },
      ],
    },
    {
      type: 'checkbox',
      label: 'question 3',
      name: 'question3',
      value: ['m'],
      options: [
        { label: 'Male1', value: 'm' },
        { label: 'Female2', value: 'f' },
      ],
    },
  ];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let formGroup: any = {};

    this.formStructure.forEach((control) => {
      formGroup[control.name] = [control.value || ''];
    });

    this.dynamicForm = this._formBuilder.group(formGroup);

    this.surveyId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.surveyId) {
      this.getEvaluation(this.surveyId);
    }
  }

  getEvaluation(surveyId: number) {
    this._surveyService.getData(surveyId).subscribe({
      next: (response) => {
        const { questions } = response;
        this.survey = response;

        // this.buildForm(questions);
      },
      error: (err) => {
        console.error('error obteniendo formulario');
      },
    });
  }

  buildForm(questions: any) {
    let formGroup: any = {};
    questions.forEach((item: any) => {
      formGroup['question'] = [''];
    });
    this.dynamicForm = this._formBuilder.group(formGroup);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }

  handleCheckbox() {
    console;
  }
}
