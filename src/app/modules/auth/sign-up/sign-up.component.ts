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
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
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
export class AuthSignUpComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  signUpForm: any;
  showAlert: boolean = false;

  errors: any = {};

  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      // agreements: ['', Validators.requiredTrue],
    });
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.showAlert = false;

    this._authService
      .signUp(this.signUpForm.value)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this._router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          console.error('error registrando usuario');

          const { error } = err;

          if (err.status == 400) {
            this.errors = error;
          }
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
