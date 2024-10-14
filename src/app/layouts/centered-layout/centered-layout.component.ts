import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { adminNavigation, userNavigation } from './menu';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-centered-layout',
  standalone: true,
  imports: [NgFor, RouterOutlet, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './centered-layout.component.html',
  styleUrl: './centered-layout.component.scss',
})
export class CenteredLayoutComponent implements OnInit {
  navigation: any = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  userId: any;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this._userService.get().pipe(takeUntil(this._unsubscribeAll)).subscribe();

    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: any) => {
        this.userId = user.id;

        if (user.is_superuser) {
          this.navigation = adminNavigation;
        } else {
          this.navigation = userNavigation;
        }
      });
  }

  signOut(): void {
    this._authService.signOut();

    this._router.navigate(['/auth/login']);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
