import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AuthSignInComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  signInForm: any;

  errors: any = {};
  error: string = '';

  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.signInForm.disable();

    this._authService
      .signIn(this.signInForm.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this._router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          const { error } = err;

          if (err.status == 400) {
            this.errors = error;
          }

          this.signInForm.enable();

          if (err.status == 401) {
            const { detail } = error;
            this.error = detail;
          }
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
