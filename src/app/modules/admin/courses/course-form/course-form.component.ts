import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CourseService } from '../../../../services/course.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  courseForm: any;

  private _courseService = inject(CourseService);

  errors: any = {};
  courseId: any = 0;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      videos: this._formBuilder.array([]),
    });

    this.courseId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.courseId) {
      this.getCourse(parseInt(this.courseId));
    }
  }

  getCourse(courseId: number) {
    this._courseService
      .getData(courseId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          const { videos } = response;
          this.courseForm.patchValue(response);

          this.setVideos(videos);
        },
        error: (err) => {
          console.error('error obteniendo sitio');
        },
      });
  }

  setVideos(videos: any) {
    const videoFormGroups: any = [];

    if (videos.length > 0) {
      videos.forEach((item: any) => {
        videoFormGroups.push(
          this._formBuilder.group({
            id: [item.id],
            title: [item.title],
            description: [item.description],
            duration: [item.duration],
            url: [item.url],
          })
        );
      });
    }

    videoFormGroups.forEach((questionFormGroup: any) => {
      (this.courseForm.get('videos') as UntypedFormArray).push(
        questionFormGroup
      );
    });
  }

  saveCourse() {
    if (this.courseForm.invalid) {
      return;
    }

    const data = this.courseForm.value;

    let form = this._courseService.postData(data);
    if (this.courseId) {
      form = this._courseService.putData(this.courseId, data);
    }

    form.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/admin/courses');
      },
      error: (err) => {
        const { error } = err;

        if (err.status == 400) {
          this.errors = error;
        }
        console.error('error guardando cursos');
      },
    });
  }

  addQuestionField(): void {
    const questionFormGroup = this._formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
      duration: [''],
      url: [''],
    });

    (this.courseForm.get('videos') as UntypedFormArray).push(questionFormGroup);
  }

  removeQuestionField(index: number): void {
    const questionsFormArray = this.courseForm.get(
      'videos'
    ) as UntypedFormArray;

    questionsFormArray.removeAt(index);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
