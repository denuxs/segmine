import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
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
import { MatTooltipModule } from '@angular/material/tooltip';

import { SiteService } from '../../../../services/site.service';
import { CountryService } from '../../../../services/country.service';
import { DepartmentService } from '../../../../services/department.service';
import { CourseService } from '../../../../services/course.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sites-form',
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
    MatTooltipModule,
  ],
  templateUrl: './sites-form.component.html',
  styleUrl: './sites-form.component.scss',
})
export class SitesFormComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  siteForm: any;

  private _siteService = inject(SiteService);
  private _countryService = inject(CountryService);
  private _departmentService = inject(DepartmentService);
  private _courseService = inject(CourseService);
  private _snackBar = inject(MatSnackBar);

  countries: any = [];
  departments: any = [];
  courses: any = [];
  errors: any = {};
  siteId: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCountries();

    this.siteForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      department: ['', [Validators.required]],
      courses: this._formBuilder.array([]),
    });

    this.siteId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.siteId) {
      this.getSite(this.siteId);
    }
  }

  getSite(siteId: number) {
    this._siteService
      .getData(siteId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          const { courses } = response;
          this.siteForm.patchValue(response);

          this.setCourses(courses);
        },
        error: (err) => {
          console.error('error obteniendo sitio');
        },
      });
  }

  setCourses(courses: any) {
    const courseFormGroups: any = [];

    if (courses.length > 0) {
      courses.forEach((item: any) => {
        courseFormGroups.push(
          this._formBuilder.group({
            id: [item.id],
          })
        );
      });
    }

    courseFormGroups.forEach((courseFormGroup: any) => {
      (this.siteForm.get('courses') as UntypedFormArray).push(courseFormGroup);
    });
  }

  getCountries() {
    this._countryService
      .getData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.countries = response;

          this.getDepartments();
          this.getCourses();
        },
        error: (err) => {
          console.error('error cargando paises');
        },
      });
  }

  getDepartments() {
    this._departmentService
      .getData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.departments = response;
        },
        error: (err) => {
          console.error('error cargando departamentos');
        },
      });
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

  saveSite() {
    if (this.siteForm.invalid) {
      return;
    }

    const data = this.siteForm.value;

    let form = this._siteService.postData(data);
    if (this.siteId) {
      form = this._siteService.putData(this.siteId, data);
    }

    form.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/admin/sites');
      },
      error: (err) => {
        const { error } = err;

        if (err.status == 400) {
          this.errors = error;
        }
        console.error('error guardando sitios');
      },
    });
  }

  addCourseField(): void {
    const courseFormGroup = this._formBuilder.group({
      id: [''],
    });

    (this.siteForm.get('courses') as UntypedFormArray).push(courseFormGroup);
  }

  removeCourseField(index: number): void {
    const coursesFormArray = this.siteForm.get('courses') as UntypedFormArray;

    coursesFormArray.removeAt(index);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
