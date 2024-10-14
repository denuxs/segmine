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

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { StudentService } from 'app/services/student.service';
import { CountryService } from 'app/services/country.service';
import { DepartmentService } from 'app/services/department.service';
import { SiteService } from 'app/services/site.service';

@Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatRadioModule,
        MatDatepickerModule,
    ],
    templateUrl: './student-form.component.html',
    styleUrl: './student-form.component.scss',
})
export class StudentFormComponent implements OnInit {
    studentForm: UntypedFormGroup;

    private _studentService = inject(StudentService);
    private _countryService = inject(CountryService);
    private _departmentService = inject(DepartmentService);
    private _siteService = inject(SiteService);

    countries = [];
    departments = [];
    sites = [];
    errors = {};
    userId = 0;

    avatarField: File;
    avatarPreview = '';

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.studentForm = this._formBuilder.group({
            birthday: ['', [Validators.required]],
            identification_type: ['', [Validators.required]],
            identification: ['', [Validators.required]],
            country: ['', [Validators.required]],
            department: ['', [Validators.required]],
            site: ['', [Validators.required]],
            company: ['', [Validators.required]],
            user: ['', [Validators.required]],
        });

        this.userId = +this._activatedRoute.snapshot.paramMap.get('id');

        if (this.userId) {
            this.getUser(this.userId);
        }

        this.getCountries();
    }

    getUser(userId: number) {
        this._studentService.getData(userId).subscribe({
            next: (response) => {
                const { avatar, user } = response;
                this.avatarPreview = avatar;
                this.studentForm.patchValue(response);
            },
            error: (err) => {
                console.error('error obteniendo usuario');
            },
        });
    }

    saveUser() {
        if (this.studentForm.invalid) {
            return;
        }

        this.formatDate();

        const data = this.studentForm.value;

        let formData = new FormData();

        if (this.avatarField) {
            formData.append('avatar', this.avatarField);
        }

        for (let prop in data) {
            formData.append(prop, data[prop]);
        }

        let form = this._studentService.postData(formData);
        if (this.userId) {
            form = this._studentService.putData(this.userId, formData);
        }

        form.subscribe({
            next: (response) => {
                this._router.navigateByUrl('/admin/users');
            },
            error: (err) => {
                const { error } = err;

                if (err.status == 400) {
                    this.errors = error;
                }
                console.error('error guardando usuario');
            },
        });
    }

    formatDate() {
        const dateString = this.studentForm.get('birthday').value;

        const parsedDate = new Date(dateString).toISOString().slice(0, 10);

        this.studentForm.controls['birthday'].setValue(parsedDate);
    }

    uploadImage(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        this.avatarField = file;

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        this._readAsDataURL(file).then((data) => {
            // Update the image
            this.avatarPreview = data;
        });
    }

    private _readAsDataURL(file: File): Promise<any> {
        // Return a new promise
        return new Promise((resolve, reject) => {
            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }

    removeImage(): void {
        this.avatarField = null;
        this.avatarPreview = null;
    }

    getCountries() {
        this._countryService.getData().subscribe({
            next: (response) => {
                this.countries = response;

                this.getDepartments();
                this.getSites();
            },
            error: (err) => {
                console.error('error cargando paises');
            },
        });
    }

    getDepartments() {
        this._departmentService.getData().subscribe({
            next: (response) => {
                this.departments = response;
            },
            error: (err) => {
                console.error('error cargando departamentos');
            },
        });
    }

    getSites() {
        this._siteService.fetchData().subscribe({
            next: (response) => {
                this.sites = response;
            },
            error: (err) => {
                console.error('error cargando sitios');
            },
        });
    }
}
