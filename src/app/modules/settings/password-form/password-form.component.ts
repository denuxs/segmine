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
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserService } from '../../../services/user.service';

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
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  passwordForm: any;

  private _userService = inject(UserService);

  error: any = null;
  errors: any = {};
  userId: any = 0;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.passwordForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.userId = this._activatedRoute.snapshot.paramMap.get('id');
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

    this._userService
      .changePassword(this.userId, data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this._router.navigateByUrl('/admin/dashboard');
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

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
