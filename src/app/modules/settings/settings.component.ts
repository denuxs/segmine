import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgClass, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

import { Subject, takeUntil } from 'rxjs';

import { PasswordFormComponent } from './password-form/password-form.component';
import { AccountFormComponent } from './account-form/account-form.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    PasswordFormComponent,
    AccountFormComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
