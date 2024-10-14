import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  userForm: any;

  private _userService = inject(UserService);

  errors: any = {};
  userId: any = 0;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      is_active: [''],
    });

    this.userId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.userId) {
      this.getUser(this.userId);
      // this.userForm.get('username').disable();
      // this.userForm.get('email').disable();
    }
  }

  getUser(userId: number) {
    this._userService
      .getData(userId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
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

    form.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/settings/' + this.userId);
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

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
