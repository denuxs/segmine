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

import { UserService } from 'app/services/user.service';

@Component({
    selector: 'app-password-form',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
    templateUrl: './password-form.component.html',
    styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent implements OnInit {
    passwordForm: UntypedFormGroup;

    private _userService = inject(UserService);

    error = null;
    errors = {};
    userId = 0;
    editMode = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.passwordForm = this._formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirm_password: [
                '',
                [Validators.required, Validators.minLength(6)],
            ],
        });

        this.userId = +this._activatedRoute.snapshot.paramMap.get('id');
    }

    saveUser() {
        if (this.passwordForm.invalid) {
            return;
        }

        const data = this.passwordForm.value;

        const { password, confirm_password } = this.passwordForm.value;

        if (password != confirm_password) {
            this.error = 'Contraseña no son iguales';
            return;
        }

        let form = this._userService.postData(data);
        if (this.userId) {
            form = this._userService.changePassword(this.userId, data);
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
                console.error('error guardando contrasenia');
            },
        });
    }
}
