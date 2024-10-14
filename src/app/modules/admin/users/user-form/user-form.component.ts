import { Component, inject, OnInit } from '@angular/core';
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

import { UserService } from 'app/services/user.service';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatRadioModule,
    ],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
    userForm: UntypedFormGroup;

    private _userService = inject(UserService);

    errors = {};
    userId = 0;
    editMode = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.userForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            is_active: [false],
            // is_active: ['', [Validators.requiredTrue]],
        });

        this.userId = +this._activatedRoute.snapshot.paramMap.get('id');

        if (this.userId) {
            this.getUser(this.userId);
            this.userForm.get('username').disable();
            this.userForm.get('email').disable();
        }
    }

    getUser(userId: number) {
        this._userService.getData(userId).subscribe({
            next: (response) => {
                this.userForm.patchValue(response);
            },
            error: (err) => {
                console.error('error obteniendo usuario');
            },
        });
    }

    saveUser() {
        if (this.userForm.invalid) {
            return;
        }

        const data = this.userForm.value;

        let form = this._userService.postData(data);
        if (this.userId) {
            form = this._userService.putData(this.userId, data);
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
}
